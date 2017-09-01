module Sanitizer
  extend ActiveSupport::Concern

  def content_sanitize_attributes(attrib_list)
    white_list_sanitizer = Rails::Html::WhiteListSanitizer.new
    selected_tags = %w(h1 h2 h3 h4 h5 h6 em strong del ul ol li br hr p a img pre)
    selected_attribs = %w(href src alt title)
    attrib_list.each do |attrib|
      if self.respond_to?(attrib)
        self[attrib] = white_list_sanitizer.sanitize(self[attrib], tags: selected_tags, attributes: selected_attribs)
      end
    end
  end

end