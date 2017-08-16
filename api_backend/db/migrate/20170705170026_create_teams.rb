class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :slug
      t.string :bio

      t.timestamps
    end

    add_index :teams, :slug, unique: true
    add_index :teams, :name
  end
end
