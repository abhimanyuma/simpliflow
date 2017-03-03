class Organisation < ApplicationRecord

  has_many :permissions, as: :resource


end
