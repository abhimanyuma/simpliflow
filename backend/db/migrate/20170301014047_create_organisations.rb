class CreateOrganisations < ActiveRecord::Migration[5.0]
  def change
    create_table :organisations do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.text :bio
      t.string :tagline

      t.timestamps
    end

    add_index :organisations, :slug, unique: true
  end
end
