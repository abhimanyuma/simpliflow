class Api::V1::PermissionsController < ApplicationController

  respond_to :json


  def create
    if current_user
      render json: {status: true, data: params}
    else
      render json: {status: false, errors: {"global": "User must be signed in"}}, status: 401
    end
  end

end
