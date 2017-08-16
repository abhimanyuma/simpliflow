class Api::V1::OrganisationsController < ApplicationController

  respond_to :json
  respond_to :form_data, only: :update
  include Filtering

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

  def show
    organisation = Organisation.find_by_slug(params[:id])

    if !organisation
      render json: {status: false, errors:{"global": "No such organisation"}}, status: 404
    elsif !current_user
      render json: {status: false, errors: {"global": "User must be signed in"}}, status: 401
    else
      if organisation.viewable?(current_user)
        org  = organisation.as_json()
        org[:user_level] = organisation.user_level(current_user)
        render json: {status: true, data: org}, status: 200
      else
        render json: {status: false, errors: {"global": "User not part of organsation"}}, status: 401
      end
    end
  end

  def update
    organisation = Organisation.find_by_slug(params[:id])

    unless organisation
      render json: {status: false, errors:{"global": "No such organisation"}}, status: 404
      return
   end

    unless organisation.modifiable?(current_user)
      render json: {status: false, errors: {"global": "User not part of organsation"}}, status: 401
      return
    end

    upload_failed = false
    update_action = "update"

    if org_file_params[:logo]
      update_action = "upload"
      org_file_params[:logo].rewind if org_file_params[:logo].respond_to?(:rewind)
      upload_failed = !organisation.upload_file(org_file_params[:logo], :logo)
    else
      organisation.assign_attributes(org_params)
    end

    if update_action == "upload"
      if upload_failed
        render json: { status: false, errors: organisation.errors, error_empty: organisation.errors.empty? }, status: 400
      else
        render json: {status: true, data: organisation}, status: 200
      end
    else
      if organisation.save!
        render json: {status: true, data: organisation}, status: 200
      else
        render json: { status: false, errors: organisation.errors}, status: 400
      end
    end

  end

  def destroy_logo
    destroy_file(:logo)
  end

  def destroy

    organisation = Organisation.find_by_slug(params[:id])

    if !organisation
      render json: {status: false, errors:{"global": "No such organisation"}}, status: 404
    elsif !current_user
      render json: {status: false, errors: {"global": "User must be signed in"}}, status: 401
    else
      if organisation.owner?(current_user)

        if organisation.destroy
          render json: {status: true, data: organisation}, status: 200
        else
          render json: { status: false, errors: organisation.errors }, status: 400
        end
      else
        render json: {status: false, errors: {"global": "User not part of organsation"}}, status: 401
      end
    end
  end

  private

    def org_params
      params.require(:organisation).permit(
        :name, :slug, :tagline, :bio
      )
    end


    def org_file_params
      params.permit(:logo)
    end

    def destroy_file(file_attribute)
      organisation = Organisation.find_by_slug(params[:id])

      unless organisation
        render json: {status: false, errors:{"global": "No such organisation"}}, status: 404
        return
      end

      unless organisation.modifiable?(current_user)
        render json: {status: false, errors: {"global": "User not part of organsation"}}, status: 401
        return
      end

      unless organisation.file_exists?(file_attribute)
        render json: {status: false, errors: {"global": "There exists no file to remove"}}, status: 404
        return
      end

      if organisation.deattach_file(file_attribute)
        render json: {status: true, data: organisation}, status: 200
      else
        render json: { status: false, errors: organisation.errors }, status: 400
      end
    end

end
