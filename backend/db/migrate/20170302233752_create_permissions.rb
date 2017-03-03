class CreatePermissions < ActiveRecord::Migration[5.0]
  def change
    create_table :permissions do |t|
      t.integer :actor_id
      t.string :actor_type
      t.integer :resource_id
      t.string :resource_type

      t.timestamps
    end

    add_index :permissions, [:actor_type, :actor_id]
    add_index :permissions, [:resource_type, :resource_id]
  end
end
