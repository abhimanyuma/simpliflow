class Api::V1::PermissionsController < ApplicationController

  respond_to :json
  include Filtering

  def create

    valid = false
    entity = false

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])

      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end

      if org.modifiable?(current_user)
        valid = true
        entity = org
      else
        render json: {status: false, errors: {"global": ["User is not allowed to modify this"]}}, status: 401
        return
      end

    end

    if params[:team_id]
      team = Team.find_by(id: params[:team_id]) || Team.find_by(slug: params[:team_id])

      unless team
        render json: {status: false, errors: {"global": ["No such team"]}}, status: 400
        return
      end

      unless team.modifiable?(current_user)
        render json: {status: false, errors: {"global": ["User is not allowed to modify this"]}}, status: 401
        return
      end

      valid = true
      entity = team
    elsif params[:role_id]
      role = Role.find_by(id: params[:role_id]) || Role.find_by(slug: params[:role_id])

      unless role
        render json: {status: false, errors: {"global": ["No such role"]}}, status: 400
        return
      end

      unless role.modifiable?(current_user)
        render json: {status: false, errors: {"global": ["User is not allowed to modify this"]}}, status: 401
        return
      end

      valid = true
      entity = role
    end


    if valid and entity
      response = entity.add_user(perm_params[:member_username])

      if response
        members = entity.members
        render json: {status: true, data: members, entity: entity.class.to_s}
      else
        render json: {status: false, errors: {global: entity.errors.full_messages}}, status: 400
      end

      return
    end

    render json: {status: false, errors: {"global": ["Unexpected error. Please contact support"]}}, status: 400
  end

  def destroy

    entity = nil
    if params[:team_id]
      entity = Team.find_by(id: params[:team_id]) || Team.find_by(slug: params[:team_id])
    elsif params[:role_id]
      entity = Role.find_by(id: params[:role_id]) || Role.find_by(slug: params[:role_id])
    elsif params[:organisation_id]
      entity = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
    end


    if params[:id]

      permission = Permission.find_by(id: params[:id])

      if permission.blank? || !permission.modifiable?(current_user)
        render json: {status: false, errors: {global: ["The user does not have enough rights to remove the member"]}}, status: 401
        return
      end

      if permission.destroy
        members = []
        members = entity.members if entity.present?
        render json: {status: true, data: members}
      else
        render json: {status: false, errors: {global: ["Unknown error"]}}, status: 400
      end

      return
    end

    render json: {status: false, errors: {global: ["Unexpected error. Please contact support"]}}, status: 400
  end

  def update

    entity = nil
    if params[:team_id]
      entity = Team.find_by(id: params[:team_id]) || Team.find_by(slug: params[:team_id])
    elsif params[:role_id]
      entity = Role.find_by(id: params[:role_id]) || Role.find_by(slug: params[:role_id])
    elsif params[:organisation_id]
      entity = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
    end


    if params[:id]

      permission = Permission.find_by(id: params[:id])

      if permission.blank? || !permission.modifiable?(current_user)
        render json: {status: false, errors: {global: ["The user does not have enough rights to remove the member"]}}, status: 401
        return
      end

      if permission.update(edit_params)
        members = []
        members = entity.members if entity.present?
        render json: {status: true, data: members}
      else
        render json: {status: false, errors: {global: ["Unknown error"]}}, status: 400
      end

      return
    end

    render json: {status: false, errors: {global: ["Unexpected error. Please contact support"]}}, status: 400
  end



  private

  def perm_params
    params.permit(
      :member_username
    )
  end

  def edit_params
    params.require(:permission).permit(:level, :full_member)
  end



end
