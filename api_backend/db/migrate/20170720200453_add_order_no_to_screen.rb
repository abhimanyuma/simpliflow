class AddOrderNoToScreen < ActiveRecord::Migration[5.0]
  def change
    add_column :screens, :order_no, :integer
  end
end
