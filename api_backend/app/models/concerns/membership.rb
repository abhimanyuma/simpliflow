module Membership
  extend ActiveSupport::Concern

  #Get all the members, with or without a particular role
  #Setting User as the default role.
  #If you need all roles, pass "all" as the role.
  def members(role = "User")
    permission_roles = self.permissions.where(actor_type: role).includes(:actor)
    response = permission_roles.map do |permission_role|
      attributes = {
        id: permission_role.id,
        level: permission_role.level,
        role: permission_role.actor_type,
        member_id: permission_role.actor_id,
        full_member: permission_role.full_member
      }
      attributes = attributes.merge(permission_role.actor.member_attributes)
      attributes
    end

    return response
  end




  def accessor_level(accessor)
    permission = self.permissions.where(actor_id: accessor, actor_type: accessor.class.to_s).first
    return permission.level if permission
    return nil
  end
  alias_method :user_level, :accessor_level


  def add_member(member)
    permission = self.permissions.create(actor_id: member.id, actor_type: member.class.to_s)
    if permission
      return true
    else
      self.errors.set(:base, "Unknown error, please contact support")
      return false
    end
  end

  def remove_member(permission_id)
    permission = Permission.find_by(id: permission_id)
    if permission.destroy
      return true
    else
      return false
    end
  end

  def modifiable?(actor)
    perm = self.permissions.where(actor_id: actor.id, actor_type: actor.class.to_s).first

    if perm.present? and (perm.owner? or perm.admin?)
      return true
    else
      return false
    end

  end

  def owner?(actor)
    perm = self.permissions.where(actor_id: actor.id, actor_type: actor.class.to_s).first

    if perm.present? and perm.owner?
      return true
    else
      return false
    end

  end


  def viewable?(actor)
    perm = self.permissions.where(actor_id: actor.id, actor_type: actor.class.to_s).first

    if perm.present?
      return true
    else
      return false
    end

  end


  #Giving helper for most common method
  def add_user(username)
    user = User.find_by(username: username)
    unless user.present?
      self.errors.set(:base, "Cannot find user")
      return false
    end

    return self.add_member(user)

  end


  def with_user(user)
    entity  = self.as_json()
    entity[:user_level] = self.user_level(user)
    return entity
  end

  module ClassMethods
    def all_entities(user, selected_ids)
      if selected_ids.nil?
        Permission.where(actor_id: user.id, actor_type: user.class.to_s, resource_type: self.to_s)
      else
        Permission.where(actor_id: user.id, actor_type: user.class.to_s, resource_type: self.to_s, resource_id: selected_ids)
      end
    end

    def all_entity_levels(user, selected_ids = nil)
      all_entities(user, selected_ids).pluck(:resource_id, :level).to_h
    end

  end

  # def all_members
  #   return self.members("all")
  # end

end