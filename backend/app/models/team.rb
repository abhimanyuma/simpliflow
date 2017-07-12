class Team < ApplicationRecord
  include Slug

  include Membership

  has_many :permissions, as: :resource, dependent: :destroy

  has_many :users, :through => :permissions, :source => :actor,
           :source_type => 'User'

  before_validation :generate_team_slug, on: :create

  belongs_to :organisation

  def generate_team_slug
    self.generate_slug(self.name)
  end

  def with_user(user)
    team  = self.as_json()
    team[:user_level] = self.user_level(user)
    return team
  end

  def org_slug
    self.organisation.slug
  end

  def org_name
    self.organisation.name
  end

  def as_json(current_options = {})

    current_options[:methods] ||= []
    current_options[:methods] = current_options[:methods] + [:members, :org_slug, :org_name]

    super(current_options)

  end

  def self.create_new(org, team_name, user)
    team = nil
    ActiveRecord::Base.transaction do
      team = org.teams.create({name: team_name})
      permission = team.permissions.create(
        actor_id: user.id,
        actor_type: user.class.to_s,
        level: :owner
      )
    end
    return team

  end

end
