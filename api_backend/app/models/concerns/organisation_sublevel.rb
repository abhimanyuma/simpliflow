module OrganisationSublevel
  extend ActiveSupport::Concern


  def organisation_slug
    self.organisation.slug
  end

  def organisation_name
    self.organisation.name
  end

  module ClassMethods

    def create_new(org, name, user)
      entity = nil
      ActiveRecord::Base.transaction do
        entity = self.create({name: name, organisation_id: org.id})
        permission = entity.permissions.create(
          actor_id: user.id,
          actor_type: user.class.to_s,
          level: :owner
        )
      end
      return entity

    end

  end


end