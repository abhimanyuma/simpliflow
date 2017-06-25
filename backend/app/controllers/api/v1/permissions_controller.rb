class Api::V1::PermissionsController < ApplicationController

  respond_to :json
  include Filtering

  def create
    if perm_params[:member_username] and perm_params[:organisation_id]
      #This is from new member adding functionality

      #Check if the current_user has permissions for the same

      org = Organisation.find_by(id: perm_params[:organisation_id])

      unless org
        render json: {status: false, errors: {"global": "No such organisation"}}, status: 400

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

    render json: {status: false, errors: {"global": "Unexpected error. Please contact support"}}, status: 400
  end

  def destroy
    if perm_params[:id] and perm_params[:organisation_id]
      #This is from new member adding functionality

      #Check if the current_user has permissions for the same

      org = Organisation.find_by(id: perm_params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": "No such organisation"}}, status: 400
        return
      end

      response = org.remove_member(perm_params[:id])
      if response
        members = org.members
        render json: {status: true, data: members}
      else
        render json: {status: false, errors: {global: org.errors.full_messages}}, status: 400
      end

      return
    end

    render json: {status: false, errors: {"global": "Unexpected error. Please contact support"}}, status: 400
  end



  private

  def perm_params
    params.permit(
      :member_username, :organisation_id, :id
    )
  end



end
