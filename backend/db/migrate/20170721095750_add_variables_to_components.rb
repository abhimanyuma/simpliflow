class AddVariablesToComponents < ActiveRecord::Migration[5.0]
  def change
    add_column :components, :variables, :jsonb
  end
end
