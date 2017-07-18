class CreateFormElements < ActiveRecord::Migration[5.0]
  def change
    create_table :form_elements do |t|
      t.string :title
      t.text :content
      t.string :sub_title
      t.jsonb :variable_mapping
      t.integer :order_no
      t.integer :state
      t.jsonb :configuration_mapping
      t.references :screen
      t.timestamps
    end
  end
end
