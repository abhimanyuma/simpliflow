class Api::V1::UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => :create

  respond_to :json

  def show
    if params[:id] == "me"
      if current_user
        render json: {status: true, data: current_user}, status: 200
      else
        render json: {status: false, errors: {}}, status: 401
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
        render json: { status: false, errors: user.errors }, status: 400
      end
    end
  end

  def update
    user = current_user

    current_password = params[:password]

    if user.valid_password?(current_password)

      if params[:refresh_auth_token]
        user.refresh_authentication_token(false)
      elsif params[:new_password] and params[:new_password_confirmation]
        new_attributes = {password: params[:new_password], password_confirmation: params[:new_password_confirmation]}
        user.assign_attributes(new_attributes)
      elsif params[:username]
        user.assign_attributes({username: params[:username]})
      elsif params[:email]
        user.assign_attributes({email: params[:email]})
      end

      if user.save
        render json: {status: true, data: user}, status: 200
      else
        render json: { status: false, errors: user.errors }, status: 400
      end

    else
      render json: { status: false, errors: {"password": ["The password is invalid"]} }, status: 403
    end

  end

  def destroy
    current_user.destroy
    head 204
  end

  private

    def user_params
      params.require(:user).permit(
        :email, :name, :username, :password,
        :refresh_auth_token, :new_password,
        :new_password_confirmation
      )
    end
end
