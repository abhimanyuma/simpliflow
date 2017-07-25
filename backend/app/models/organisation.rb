class Organisation < ApplicationRecord

  include Slug

  include Membership

  include FileOperations

  has_many :permissions, as: :resource, dependent: :destroy

  has_many :users, :through => :permissions, :source => :actor,
           :source_type => 'User'

  belongs_to :logo, class_name: 'FileStore', primary_key: 'logo_id'

  before_validation :generate_org_slug, on: :create

  has_many :teams
  has_many :roles

  def file_attributes
    return [:logo]
  end

  def self.get_user_organisations(actor_id, actor_type = "User")
    org_permissions =  Permission.joins("
      LEFT JOIN organisations ON
      permissions.resource_id = organisations.id
    ").select("
      permissions.level,
      organisations.id as id,
      organisations.name org_name,
      organisations.slug as org_slug
    ").where(actor_id: actor_id, actor_type: actor_type, resource_type: self.to_s)

    response = org_permissions.as_json(only: [:level], methods: [:id, :org_name, :org_slug])

    return response
  end

  def get_org_teams()
    teams = self.teams.as_json()
    teams_with_additional_info = teams.map do |team|
      team.merge({
        organisation_slug: self.slug
      })
    end
    return teams_with_additional_info
  end

  def get_org_roles()
    roles = self.roles.as_json()
    roles_with_additional_info = roles.map do |role|
      role.merge({
        organisation_slug: self.slug
      })
    end
    return roles_with_additional_info
  end

  def create_team(team_name, user)
    Team.create_new(self, team_name, user)
  end

  def create_role(role_name, user)
    Role.create_new(self, role_name, user)
  end

  def as_json(current_options = {})

    current_options[:methods] ||= []
    current_options[:methods] = current_options[:methods] + [:members]

    super(current_options)

  end

  def generate_org_slug
    self.generate_slug(self.name)
  end

end
