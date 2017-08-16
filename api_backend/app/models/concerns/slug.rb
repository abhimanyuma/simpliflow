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

  def display_text
    if self.class.search_additional_field
      return  self[self.class.search_additional_field.to_sym]
    else
      return nil
    end
  end

  class_methods do

    def search_additional_field
      if self.respond_to?(:search_field)
        return self.search_field
      elsif self.respond_to?(:name)
        return :name
      else
        return nil
      end
    end

    def search(term, limit = 10, start = 0)

      field = self.slug_field || :slug

      select_fields = [:id,"#{field}".to_sym]
      select_fields.push(self.search_additional_field) if self.search_additional_field

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
      ).limit(limit).offset(start).select(select_fields)

      matches = exact_match + prefix_match
      response = matches.map do |match|
        response = {value: match[field.to_sym]}
        if self.search_additional_field
          response[:display_text] = match.display_text
        end
        response

      end

    end

  end


end