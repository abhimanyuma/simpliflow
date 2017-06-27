class Organisation < ApplicationRecord

  include Slug

  include Membership

  has_many :permissions, as: :resource, dependent: :destroy

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

  def as_json(current_options)
    if current_options[:methods]
      current_options[:methods].push(:member_usernames)
      super(current_options)
    else
      super(methods: [:members])
    end
  end


  def generate_org_slug
    self.generate_slug(self.name)
  end

end
