class Api::V1::OrganisationsController < ApplicationController

  respond_to :json

  def index

    if current_user
      organisations = current_user.get_organisations
      render json: {status: true, data: organisations}, status: 200
    else
      render json: {status: false, errors: {}}, status: 401
    end

  end

  def create
    if current_user
      org = nil
      permission = nil
      ActiveRecord::Base.transaction do
        org = Organisation.create(org_params)
        permission = org.permissions.create(
          actor_id: current_user.id,
          actor_type: current_user.class.to_s,
          level: :owner
        )
      end
      if org.present? and permission.present?
        response = {id: org.id, name: org.name, slug: org.slug, level: permission.level}
        render json: {status: true, data: response}, status: 200
      else
        render json: {status: false, errors: {"global": "Unable to create organisation"}}, status: 401
      end

    else
      render json: {status: false, errors: {"global": "User must be signed in"}}, status: 401
    end
  end

  private

    def org_params
      params.require(:organisation).permit(
        :name, :slug
      )
    end

end
