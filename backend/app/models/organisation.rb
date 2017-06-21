class Organisation < ApplicationRecord

  include Slug
  include AccessControl

  has_many :permissions, as: :resource

  has_many :users, :through => :permissions, :source => :actor,
           :source_type => 'User'

  before_validation :generate_org_slug, on: :create


  def self.get_user_organisations(actor_id, actor_type = "User")
    org_permissions =  Permission.joins("
      LEFT JOIN organisations ON
      permissions.resource_type='Organisation' AND
      permissions.resource_id = organisations.id
    ").select("
      permissions.level,
      organisations.id as id,
      organisations.name org_name,
      organisations.slug as org_slug
    ").where(actor_id: actor_id, actor_type: actor_type)

    response = org_permissions.as_json(only: [:level], methods: [:id, :org_name, :org_slug])

    return response
  end

  def add_user(username)
    user = User.find_by(username: username)
    unless user.present?
      self.errors.add(:base, "User does not exist")
      return false
    end

    if self.permissions.where(actor_id: user.id, actor_type: user.class.to_s).present?
      self.errors.add(:base, "User is already present")
      return false
    end

    permission = self.permissions.create(actor_id: user.id, actor_type: user.class.to_s)
    if permission
      return true
    else
      return false
    end

  end


  def generate_org_slug
    self.generate_slug(self.name)
  end

end
