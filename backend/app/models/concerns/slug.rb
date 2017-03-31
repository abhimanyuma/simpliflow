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

  class_methods do

    def search_additional_fields
      if self.respond_to?(:search_fields)
        return self.search_fields
      elsif self.respond_to?(:name)
        return [:name]
      else
        return []
      end
    end

    def search(term, limit = 10, start = 0)

      field = self.slug_field || :slug
      select_fields = [:id,"#{field}".to_sym] + self.search_additional_fields
      exact_match = self.where("#{field} LIKE :term", term: "#{term}").select(select_fields).limit(1) #Always 1


      unless exact_match.blank?
        if start == 0
          limit = limit - 1
        else
          start = start - 1
        end
      end
      prefix_match = self.where(
        "#{field} LIKE :term AND #{field} NOT LIKE :exact",
        term: "#{term}%", exact: "#{term}"
      ).select(:username).limit(limit).offset(start).select(select_fields)

      return exact_match + prefix_match
    end

  end


end