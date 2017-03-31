class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  include ::Slug

  validates :auth_token, uniqueness: true
  validates :username, uniqueness: true
  before_validation :generate_authentication_token!, on: :create
  before_validation :generate_username, on: :create

  enum role: [ :user, :manager, :admin, :super_admin ]

  has_many :permissions, as: :actor

  def generate_authentication_token!
    begin
      self.auth_token = Devise.friendly_token
    end while self.class.exists?(auth_token: auth_token)
  end

  def refresh_authentication_token(save_obj = true)
    self.auth_token = Devise.friendly_token
    self.save! if save_obj
  end

  def generate_username
    self.generate_slug(self.name)
  end

  def get_organisations
    Organisation.get_user_organisations(self.id)
  end

  def self.policy_class
    ProfilePolicy
  end

  def self.slug_field
    :username
  end

end
