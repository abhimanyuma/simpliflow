class Api::V1::SessionsController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => :create

  def create

    user_password = session_params[:password]
    user_id = session_params[:user_id]
    user = nil
    if user_id.present?
      user = User.find_by(email: user_id)
      unless user
        user = User.find_by(username: user_id)
      end
    end

    if user and user.valid_password? user_password

      sign_in user, store: false
      user.generate_authentication_token!
      user.save!
      render json: {status: true, data:user}, status: 200, location: [:api, user]
    else
      render json: { errors: {"global": "Invalid email or password"}}, status: 422
    end

  end

  def destroy

    user = User.find_by(auth_token: params[:id])
    user.generate_authentication_token!
    user.save!
    head 204

  end


  private

    def session_params
      params.require(:user).permit(:password, :user_id)
    end

end
