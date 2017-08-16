class CreateFileStores < ActiveRecord::Migration[5.0]
  def change
    create_table :file_stores do |t|
      t.integer :state
      t.string :file_hash


      t.timestamps
    end
    add_attachment :file_stores, :attached_file
    add_index :file_stores, :attached_file_file_name
    add_index :file_stores, :file_hash
  end


end
