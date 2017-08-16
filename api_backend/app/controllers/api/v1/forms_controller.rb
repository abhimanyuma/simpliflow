class Api::V1::FormsController < ApplicationController

  respond_to :json
  include Filtering

  def index

    forms = Form.get_user_forms(current_user)
    render json: {status: true, data: forms}, status: 200

  end

  def show

    form = Form.find_by(uuid: params[:id])
    if form.permissible_for_user?(current_user)
      render json: {status: true, data: form}, status: 200
    else
      render json: {status: false, errors: {"global": ["You are not authorized to view this form"]}}, status: 401
    end
  end


end
