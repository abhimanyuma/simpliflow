module Slug
  extend ActiveSupport::Concern

  def generate_slug(value)

    field_name = "slug"
    if  self.class.respond_to?("slug_field")
      field_name = self.class.slug_field
    end

    if self[field_name].blank?
      base_slug = value.gsub(/\W+/, '').downcase
      if base_slug.blank?
        base_slug = self.class.to_s
      end
      count = 0
      probable_slug = base_slug
      while true
        #TODO: Make more efficient
        probable_slug = "#{base_slug}_#{count}" unless count == 0
        break if self.class.where("#{field_name}": probable_slug).blank?
        count += 1
      end
      self[field_name] = probable_slug
    end
  end


end