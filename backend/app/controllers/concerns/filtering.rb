module Filtering
  extend ActiveSupport::Concern

  included do
    before_filter :needs_authentication
  end

  def needs_authentication
    unless current_user
      render json: {status: false, errors: {"global": "User must be signed in"}}, status: 401
      return false
    end
    return true
  end
end