class Api::V1::OrganisationsController < ApplicationController

  respond_to :json

  def index

    if current_user
      organisations = current_user.get_organisations
      render json: {status: true, data: organisations, params: params}, status: 200
    else
      render json: {status: false, errors: {}, current_user: current_user}, status: 401
    end

  end


end
