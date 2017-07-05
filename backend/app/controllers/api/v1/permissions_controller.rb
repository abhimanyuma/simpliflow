class Api::V1::PermissionsController < ApplicationController

  respond_to :json
  include Filtering

  def create
    if perm_params[:member_username] and perm_params[:organisation_id]
      #This is from new member adding functionality

      #Check if the current_user has permissions for the same

      org = Organisation.find_by(id: perm_params[:organisation_id])

      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end

      unless org.modifiable?(current_user)
        render json: {status: false, errors: {"global": ["User is not allowed to modify this"]}}, status: 401
        return
      end

      response = org.add_user(perm_params[:member_username])

      if response
        members = org.members
        render json: {status: true, data: members}
      else
        render json: {status: false, errors: {global: org.errors.full_messages}}, status: 400
      end

      return
    end

    render json: {status: false, errors: {"global": ["Unexpected error. Please contact support"]}}, status: 400
  end

  def destroy

    entity = nil
    if perm_params[:organisation_id]
      entity = Organisation.find_by(id: perm_params[:organisation_id])
    end


    if perm_params[:id]

      permission = Permission.find_by(id: perm_params[:id])

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
    if perm_params[:organisation_id]
      entity = Organisation.find_by(id: perm_params[:organisation_id])
    end


    if perm_params[:id]

      permission = Permission.find_by(id: perm_params[:id])

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
      :member_username, :organisation_id, :id
    )
  end

  def edit_params
    params.require(:permission).permit(:level, :full_member)
  end



end
