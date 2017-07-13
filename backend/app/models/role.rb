class Role < ApplicationRecord

  include Slug

  include Membership
  include OrganisationSublevel

  has_many :permissions, as: :resource, dependent: :destroy

  has_many :users, :through => :permissions, :source => :actor,
           :source_type => 'User'

  before_validation :generate_role_slug, on: :create

  belongs_to :organisation

  def generate_role_slug
    self.generate_slug(self.name)
  end

  def as_json(current_options = {})

    current_options[:methods] ||= []
    current_options[:methods] = current_options[:methods] + [:members, :organisation_slug, :organisation_name]

    super(current_options)

  end

end
