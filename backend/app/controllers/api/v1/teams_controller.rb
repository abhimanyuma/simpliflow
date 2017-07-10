class Api::V1::TeamsController < ApplicationController

  respond_to :json
  include Filtering
  def index

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end

      unless org.modifiable?(current_user)
        render json: {status: false, errors: {"global": ["User is not allowed to modify this"]}}, status: 401
        return
      end

      render json: {status: true, data: org.get_org_teams}

    end

  end


end
