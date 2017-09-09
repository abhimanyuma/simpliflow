class AddComponentIdToFormElement < ActiveRecord::Migration[5.0]
  def change
    add_reference :form_elements, :component, foreign_key: true
  end
end
