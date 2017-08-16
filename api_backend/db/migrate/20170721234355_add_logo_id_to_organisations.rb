class AddLogoIdToOrganisations < ActiveRecord::Migration[5.0]
  def change
    add_column :organisations, :logo_id, :integer
  end
end
