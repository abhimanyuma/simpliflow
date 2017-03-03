class Permission < ApplicationRecord

  belongs_to :actor, polymorphic: true
  belongs_to :resource, polymorphic: true

  enum level: [ :regular, :admin, :owner]
end
