class CreateScreens < ActiveRecord::Migration[5.0]
  def change
    create_table :screens do |t|
      t.string :title
      t.string :sub_title
      t.text :content
      t.references :form
      t.timestamps
    end
  end
end
