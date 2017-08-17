class AddContentTypeToForm < ActiveRecord::Migration[5.0]
  def change
    add_column :forms, :content_type, :integer, default: 0
  end
end
