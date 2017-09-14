class Api::V1::ComponentsController < ApplicationController

  respond_to :json
  include Filtering

  def index

    components = Component.all
    render json: {status: true, data: components}, status: 200

  end


end
