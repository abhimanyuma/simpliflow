class Api::V1::PermissionsController < ApplicationController

  respond_to :json
  include Filtering

  def create
    if create_params[:member_username] and create_params[:organisation_id]
      #This is from new member adding functionality

      #Check if the current_user has permissions for the same

      org = Organisation.find_by(id: create_params[:organisation_id])

      unless org
        render json: {status: false, errors: {"global": "No such organisation"}}, status: 400

        return
      end

      response = org.add_user(create_params[:member_username])

      if response
        members = org.users.pluck(:username)
        render json: {status: true, data: members}
      else
        render json: {status: false, errors: {global: org.errors.full_messages}}, status: 400
      end

      return
    end

    render json: {status: false, errors: {"global": "Unexpected error. Please contact support"}}, status: 400
  end



  private

  def create_params
    params.permit(
      :member_username, :organisation_id
    )
  end



end
