class Api::V1::UsersController < ApplicationController
  
  skip_before_filter :verify_authenticity_token, :only => :create

  respond_to :json

  def show
    if params[:id] == "me"
      if current_user
        render json: {status: true, data: current_user}, status: 200
      else
        render json: {}, status: 200
      end
    else
      respond_with User.find(params[:id])
    end

  end

  def create
    if current_user
      render json: {status: false, error: "You are already logged in"}, status: 400
    else
      user = User.new(user_params)
      if user.save
        render json: {status: true, data: user}, status: 201, location: [:api, user]
      else
        render json: { status: false, error: user.errors }, status: 400
      end
    end
  end

  def update
    user = current_user

    if user.update(user_params)
      render json: user, status: 200, location: [:api, user]
    else
      render json: { errors: user.errors }, status: 422
    end
  end

  def destroy
    current_user.destroy
    head 204
  end

  private

    def user_params
      params.require(:user).permit(:email, :name, :password, :password_confirmation)
    end
end
