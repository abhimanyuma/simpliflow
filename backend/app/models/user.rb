class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

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
    if self.username.blank?
      base_username = self.name.gsub(/\W+/, '').downcase
      if base_username.blank?
        base_username = 'user'
      end
      count = 0
      probable_username = base_username
      while true
        #TODO: Make more efficient
        probable_username = "#{base_username}_#{count}" unless count == 0
        break if User.where(username: probable_username).blank?
        count += 1
      end
      self.username = probable_username
    end
  end

  def get_organisations
    org_permissions =  Permission.joins("
      LEFT JOIN organisations ON
      permissions.resource_type='Organisation' AND
      permissions.resource_id = organisations.id
    ").select("
      permissions.level,
      organisations.id as org_id,
      organisations.name org_name,
      organisations.slug as org_slug
    ")

    response = org_permissions.as_json(only: [:level], methods: [:org_name, :org_slug])

    return response
  end

  def self.policy_class
    ProfilePolicy
  end

end
