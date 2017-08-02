class FormPermission < ApplicationRecord

  enum permission: [:allowed, :disallowed]

  def permissible?(user, user_permissions)
    if (self.user_id == user.id)
      return self.allowed?
    elsif (self.user_id.present?)
      return nil
    end

    if (self.organisation_id.present? and self.team_id.blank? and self.role_id.blank?)
      if user_permissions[:org_permissions][self.organisation_id].blank?
        return nil
      elsif self.additional_restrictions["org_min_level"].blank?
        return self.allowed?
      elsif self.additional_restrictions["org_min_level"].present? and level_is_higher(user_permissions[:org_permissions][self.organisation_id], self.additional_restrictions["org_min_level"])
        return self.allowed?
      else
        return nil
      end
    end

    if (self.team_id.present? and self.role_id.blank?)
      if user_permissions[:team_permissions][self.team_id].blank?
        return nil
      elsif self.additional_restrictions["team_min_level"].blank?
        return self.allowed?
      elsif self.additional_restrictions["team_min_level"].present? and
        level_is_higher(user_permissions[:team_permissions][self.team_id], self.additional_restrictions["team_min_level"] )
        return self.allowed?
      else
        return nil
      end
    end

    if (self.role_id.present? and self.team_id.blank?)
      if user_permissions[:role_permissions][self.role_id].blank?
        return nil
      elsif self.additional_restrictions["role_min_level"].blank?
        return self.allowed?
      elsif self.additional_restrictions["role_min_level"].present? and
        level_is_higher(user_permissions[:role_permissions][self.role_id], self.additional_restrictions["role_min_level"])
        return self.allowed?
      else
        return nil
      end
    end

    if (self.role_id.present? and self.team_id.present?)
      if user_permissions[:role_permissions][self.role_id].blank? or user_permissions[:team_permissions][self.team_id].blank?
        return nil
      elsif self.additional_restrictions["role_min_level"].blank? and self.additional_restrictions["team_min_level"].blank?
        return self.allowed?
      elsif
        ((
          self.additional_restrictions["role_min_level"].present? and
          level_is_higher(user_permissions[:role_permissions][self.role_id], self.additional_restrictions["role_min_level"].present? )
        ) or (
          self.additional_restrictions["role_min_level"].blank?
        )) and ((
          self.additional_restrictions["team_min_level"].present? and
          level_is_higher(user_permissions[:team_permissions][self.team_id], self.additional_restrictions["team_min_level"].present?)
        ) or (
          self.additional_restrictions["team_min_level"].blank?
        ))
        return self.allowed?
      else
        return nil
      end
    end

  end

  def self.find_permissible(frp_map, user, user_permissions)
    permissible_ids = []
    frp_map.each do |form_id, frp_array|
      permissible = false
      frp_array.each do |frp|
        current_perm = frp.permissible?(user, user_permissions)
        if frp.nil?
          next
        elsif current_perm == false
          permissible = false
          break;
        elsif current_perm == true
          permissible = true
          break;
        end
      end
      permissible_ids << form_id
    end
    return permissible_ids
  end

  private

  def level_is_higher(given_level, target_level)
    return true if given_level == "owner"
    return true if given_level == "admin" and target_level != "owner"
    return true if given_level == "member" and target_level == "member"
    return false
  end

end
