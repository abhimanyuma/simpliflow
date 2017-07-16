class CreateForms < ActiveRecord::Migration[5.0]
  def change
    create_table :forms do |t|
      t.string :title
      t.string :sub_title
      t.text :content
      t.references :organisation
      t.string :uuid

      t.timestamps
    end
  end
end
