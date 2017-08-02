class CreateFormPermissions < ActiveRecord::Migration[5.0]
  def change
    create_table :form_permissions do |t|
      t.integer :resource_id
      t.string :resource_type
      t.references :user
      t.references :organisation
      t.references :team
      t.references :role
      t.integer :permission, default: 0
      t.integer :action, default: 0
      t.integer :priority, default: 0
      t.json :additional_restrictions

      t.timestamps
    end

    add_index :form_permissions, [:resource_id, :resource_type], name: 'resource_full_index'
    add_index :form_permissions, [:organisation_id, :team_id], name: 'org_team_index'
    add_index :form_permissions, [:team_id, :role_id], name: 'team_role_index'
    add_index :form_permissions, [:organisation_id, :role_id], name: 'org_role_index'
  end
end
