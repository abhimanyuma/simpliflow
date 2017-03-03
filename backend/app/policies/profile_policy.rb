class UserPolicyt
  attr_reader :user, :profile

  def initialize(user, profile)
    @user = user
    @post = profile
  end

  def update?
    (profile.id == user.id) || user.super_admin?
  end
end