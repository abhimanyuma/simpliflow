class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :auth_token, uniqueness: true
  validates :user_name, uniqueness: true
  before_validation :generate_authentication_token!, on: :create
  before_validation :generate_username, on: :create


  def generate_authentication_token!
    begin
      self.auth_token = Devise.friendly_token
    end while self.class.exists?(auth_token: auth_token)
  end

  def generate_username
    if self.user_name.blank?
      base_user_name = self.name.gsub(/\W+/, '').downcase
      if base_user_name.blank?
        base_user_name = 'user'
      end
      count = 0
      probable_user_name = base_user_name
      while true
        #TODO: Make more efficient
        probable_user_name = "#{base_user_name}_#{count}" unless count == 0
        break if User.where(user_name: probable_user_name).blank?
        count += 1
      end
      self.user_name = probable_user_name
    end
  end
end
