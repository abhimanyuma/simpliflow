class Api::V1::FormsController < ApplicationController

  respond_to :json
  include Filtering

  def index

    forms = Form.get_user_forms(current_user)
    render json: {status: true, data: forms}, status: 200

  end


end
