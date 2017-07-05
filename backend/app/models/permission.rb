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

  def modifiable?(actor)
    perm = Permission.where(
      actor_id: actor.id,
      actor_type: actor.class.to_s,
      resource_id: self.resource_id,
      resource_type: self.resource_type
      ).first

    if perm.present? and (perm.owner? or perm.admin?)
      return (perm.level_before_type_cast >= self.level_before_type_cast)
    else
      return false
    end

  end

  def viewable?(actor)
    perm = Permission.where(
      actor_id: actor.id,
      actor_type: actor.class.to_s,
      resource_id: self.resource_id,
      resource_type: self.resource_type
      ).first

    if perm.present?
      return true
    else
      return false
    end

  end

end
