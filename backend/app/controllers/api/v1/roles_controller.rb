class Api::V1::RolesController < ApplicationController

  respond_to :json
  include Filtering
  def index

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end

      unless org.modifiable?(current_user)
        render json: {status: false, errors: {"global": ["User is not allowed to modify this"]}}, status: 401
        return
      end

      render json: {status: true, data: org.get_org_roles}

    end

  end

  def create

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end

      unless org.modifiable?(current_user)
        render json: {status: false, errors: {"global": ["User is not allowed to modify this"]}}, status: 401
        return
      end

      role = org.create_role(role_params[:name], current_user)
      if role
        render json: {status: true, data: role.with_user(current_user)}
      else
        render json: {status: false, errors: {"global": ["Unknown Error"]}}, status: 400
      end
    end

  end


  def show

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end


      role = Role.where(organisation_id: org.id, id: params[:id]).first || Role.where(organisation_id: org.id, slug: params[:id]).first

      viewable = false
      if role.present? and (org.modifiable?(current_user) || role.viewable?(current_user))
        viewable = true
      end

      if role.blank?
        render json: {status: false, errors: {"global": ["No such role"]}}, status: 404
      elsif viewable
        render json: {status: true, data: role.with_user(current_user)}
      else
        render json: {status: false, errors: {"global": ["You do not have access to view this"]}}, status: 401
      end
    end
  end


  def update

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end


      role = Role.where(organisation_id: org.id, id: params[:id]).first || Role.where(organisation_id: org.id, slug: params[:id]).first

      modifiable = false
      if role.present? and (org.owner?(current_user) || role.modifiable?(current_user))
        modifiable = true
      end

      if role.blank?
        render json: {status: false, errors: {"global": ["No such role"]}}, status: 404
      elsif modifiable
        role.assign_attributes(role_params)

        if role.save
          render json: {status: true, data: role.with_user(current_user)}
        else
          render json: { status: false, errors: role.errors }, status: 400
        end
      else
        render json: {status: false, errors: {"global": ["You do not have access to view this"]}}, status: 401
      end
    end

  end

  def destroy

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end

      role = Role.where(organisation_id: org.id, id: params[:id]).first || Role.where(organisation_id: org.id, slug: params[:id]).first

      removable = false
      if role.present? and (org.owner?(current_user) || role.owner?(current_user))
        removable = true
      end

      if role.blank?
        render json: {status: false, errors: {"global": ["No such role"]}}, status: 404
      elsif removable

        if role.destroy
          render json: {status: true, data: role}
        else
          render json: { status: false, errors: role.errors }, status: 400
        end
      else
        render json: {status: false, errors: {"global": ["You do not have access to view this"]}}, status: 401
      end
    end

  end




  private

  def role_params
    params.require(:role).permit(
        :name, :slug, :bio
      )
  end


end
