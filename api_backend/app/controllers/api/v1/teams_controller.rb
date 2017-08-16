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

  def create

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

      team = org.create_team(team_params[:name], current_user)
      if team
        render json: {status: true, data: team.with_user(current_user)}
      else
        render json: {status: false, errors: {"global": ["Unknown Error"]}}, status: 400
      end
    end

  end


  def show

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end


      team = Team.where(organisation_id: org.id, id: params[:id]).first || Team.where(organisation_id: org.id, slug: params[:id]).first

      viewable = false
      if team.present? and (org.modifiable?(current_user) || team.viewable?(current_user))
        viewable = true
      end

      if team.blank?
        render json: {status: false, errors: {"global": ["No such team"]}}, status: 404
      elsif viewable
        render json: {status: true, data: team.with_user(current_user)}
      else
        render json: {status: false, errors: {"global": ["You do not have access to view this"]}}, status: 401
      end
    end
  end


  def update

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end


      team = Team.where(organisation_id: org.id, id: params[:id]).first || Team.where(organisation_id: org.id, slug: params[:id]).first

      modifiable = false
      if team.present? and (org.owner?(current_user) || team.modifiable?(current_user))
        modifiable = true
      end

      if team.blank?
        render json: {status: false, errors: {"global": ["No such team"]}}, status: 404
      elsif modifiable
        team.assign_attributes(team_params)

        if team.save
          render json: {status: true, data: team.with_user(current_user)}
        else
          render json: { status: false, errors: team.errors }, status: 400
        end
      else
        render json: {status: false, errors: {"global": ["You do not have access to view this"]}}, status: 401
      end
    end

  end

  def destroy

    if params[:organisation_id]
      org = Organisation.find_by(id: params[:organisation_id]) || Organisation.find_by(slug: params[:organisation_id])
      unless org
        render json: {status: false, errors: {"global": ["No such organisation"]}}, status: 400
        return
      end

      team = Team.where(organisation_id: org.id, id: params[:id]).first || Team.where(organisation_id: org.id, slug: params[:id]).first

      removable = false
      if team.present? and (org.owner?(current_user) || team.owner?(current_user))
        removable = true
      end

      if team.blank?
        render json: {status: false, errors: {"global": ["No such team"]}}, status: 404
      elsif removable

        if team.destroy
          render json: {status: true, data: team}
        else
          render json: { status: false, errors: team.errors }, status: 400
        end
      else
        render json: {status: false, errors: {"global": ["You do not have access to view this"]}}, status: 401
      end
    end

  end




  private

  def team_params
    params.require(:team).permit(
        :name, :slug, :bio
      )
  end


end
