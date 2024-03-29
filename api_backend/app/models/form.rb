class Form < ApplicationRecord

  include Sanitizer

  before_create :set_uuid

  before_save :sanitize_content

  enum level: [ :regular, :admin, :owner]
  enum content_type: [ :plain_text, :markdown, :rich_text]

  def set_uuid
    self.uuid = SecureRandom.uuid
  end

  def sanitize_content
    self.content_sanitize_attributes([:content])

  end

  def source
    "ONLINE"
  end

  def as_json(options)
    options[:except] ||= [:id]
    options[:methods] ||= [:source]
    super(options)
  end

  def self.get_user_forms(user)
    #Get User directly dependent ones
    valid_forms = FormPermission.where(resource_type:"Form")

    form_permission_ids = valid_forms.where(user_id: user.id).pluck(:id)
    #Get User organisation ones
    user_org_permissions = Organisation.all_entity_levels(user)
    user_org_ids = user_org_permissions.keys
    form_permission_ids += valid_forms.where(organisation_id: user_org_ids, team_id: nil, role_id: nil, user_id: nil).pluck(:id)
    #Get Team ones
    user_team_permissions = Team.all_entity_levels(user)
    user_team_ids = user_team_permissions.keys
    form_permission_ids += valid_forms.where(team_id: user_team_ids, role_id: nil, user_id: nil).pluck(:id)
    #Get Role ones
    user_role_permissions = Role.all_entity_levels(user)
    user_role_ids = user_role_permissions.keys
    form_permission_ids += valid_forms.where(team_id: nil, role_id: user_role_ids, user_id: nil).pluck(:id)
    #Get Team Role ones
    form_permission_ids += valid_forms.where(team_id: user_team_ids, role_id: user_role_ids, user_id: nil).pluck(:id)

    puts form_permission_ids
    form_permissions = valid_forms.where(id: form_permission_ids)
    form_permissions_map = id_mapify(form_permissions)

    get_possible_form_ids = FormPermission.find_permissible(form_permissions_map, user,
      {
      org_permissions: user_org_permissions,
      team_permissions: user_team_permissions,
      role_permissions: user_role_permissions
      }
    )

    return Form.where(id: get_possible_form_ids)

  end


  def permissible_for_user?(user)
    #Get User directly dependent ones
    frp = FormPermission.where(resource_type:self.class.to_s, resource_id: self.id).to_a

    user_org_ids = frp.map(&:organisation_id).compact
    user_org_permissions = Organisation.all_entity_levels(user, user_org_ids)
    #Get Team ones
    user_team_ids = frp.map(&:team_id).compact
    user_team_permissions = Team.all_entity_levels(user, user_team_ids)
    #Get Role ones
    user_role_ids = frp.map(&:role_id).compact
    user_role_permissions = Role.all_entity_levels(user)

    permissible = FormPermission.permissible_for_form?(frp, user,
      {
      org_permissions: user_org_permissions,
      team_permissions: user_team_permissions,
      role_permissions: user_role_permissions
      }
    )

    return permissible

  end


  private

  def self.id_mapify(form_permissions)
    permission_map = {}
    form_permissions.each do |frp|
      permission_map[frp.resource_id] ||= []
      permission_map[frp.resource_id].push(frp)
    end

    permission_map.each do |_form_id, frp_array|
      frp_array = frp_array.sort_by{|frp| frp.priority}
    end

    return permission_map
  end

end
