class Api::V1::FormsController < ApplicationController

  respond_to :json
  include Filtering

  def index

    forms = Form.get_user_forms(current_user)
    render json: {status: true, data: forms}, status: 200

  end

  def show

    form = Form.find_by(uuid: params[:id])
    if form.blank?
      render json: {status: false, errors: {"global": ["No such form"]}}, status: 404
    elsif form.permissible_for_user?(current_user)
      render json: {status: true, data: form}, status: 200
    else
      render json: {status: false, errors: {"global": ["You are not authorized to view this form"]}}, status: 401
    end
  end

  def update
    form = Form.find_by(uuid: params[:id])
    if form.blank?
      render json: {status: false, errors: {"global": ["No such form"]}}, status: 404
    elsif form.permissible_for_user?(current_user)
      form.assign_attributes(form_params)

      if form.save!
        render json: {status: true, data: form}
      else
        render json: {status: false, errors: form.errors}, status: 400
      end
    else
      render json: {status: false, errors: {"global": ["You are not authorized to edit this form"]}}, status: 401
    end

  end

  private

  def form_params
    params.require(:form).permit(
      :title, :sub_title, :content, :content_type
    )
  end


end
