module AccessControl
  extend ActiveSupport::Concern

  def get_role(actor)
    permission = self.permissions.where(actor: actor).first
    return nil if permission.blank?

    return permission.level
  end

  def accessible?(actor)
    role = get_role(actor)

    if role
      return true
    else
      return false
    end
  end


end