class Api::V1::OrganisationsController < ApplicationController

  respond_to :json

  def show

    if current_user
      organisations = nil
    else
      render json: {status: false, errors: {}}, status: 401
    end





  end


end
