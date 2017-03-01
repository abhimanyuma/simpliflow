class CreateOrganizations < ActiveRecord::Migration[5.0]
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :slug
      t.text :bio
      t.string :tagline

      t.timestamps
    end
  end
end
