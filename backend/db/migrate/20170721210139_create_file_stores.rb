class CreateFileStores < ActiveRecord::Migration[5.0]
  def change
    create_table :file_stores do |t|
      t.integer :state
      t.string :hash


      t.timestamps
    end
    add_attachment :file_stores, :store
    add_index :file_stores, :store_file_name
    add_index :file_stores, :hash
  end


end
