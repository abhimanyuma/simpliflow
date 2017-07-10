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

end
