class Permission < ApplicationRecord

  belongs_to :actor, polymorphic: true
  belongs_to :resource, polymorphic: true

  enum level: [ :regular, :admin, :owner]

  before_create :set_full_member

  def set_full_member
    if (self.actor_type != "User") and (self.admin? or self.owner?)
      self.full_member = false
    else
      self.full_member = true
    end
  end

end
