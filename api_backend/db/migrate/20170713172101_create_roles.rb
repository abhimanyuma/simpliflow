class CreateRoles < ActiveRecord::Migration[5.0]
  def change
    create_table :roles do |t|
      t.string :name
      t.string :slug
      t.string :bio
      t.references :organisation

      t.timestamps
    end

    add_index :roles, :slug, unique: true
    add_index :roles, :name
  end
end
