class AddOrganisationIdToTeams < ActiveRecord::Migration[5.0]
  def change
    add_column :teams, :organisation_id, :integer
    add_index :teams, :organisation_id
  end
end
