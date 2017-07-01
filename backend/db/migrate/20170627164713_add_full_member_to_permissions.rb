class AddFullMemberToPermissions < ActiveRecord::Migration[5.0]
  def change
    add_column :permissions, :full_member, :boolean, default: true
  end
end
