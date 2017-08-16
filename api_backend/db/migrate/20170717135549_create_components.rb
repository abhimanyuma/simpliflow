class CreateComponents < ActiveRecord::Migration[5.0]
  def change
    create_table :components do |t|
      t.string :name
      t.text :description
      t.boolean :as_file
      t.string :object_name

      t.timestamps
    end

    add_index :components, :name
    add_index :components, :object_name
  end
end
