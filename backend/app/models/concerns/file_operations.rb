module FileOperations
  extend ActiveSupport::Concern


  def upload_file(att_file, field = :file_store)
    fs = FileStore.new()
    fs.attached_file = att_file
    fs.save!

    self["#{field}_id".to_sym] = fs.id

    return self["#{field}_id".to_sym].present?

  end

  def get_file_attributes(field = :file_store)

    return nil unless self.respond_to?(field)
    fs = self.method(field).call
    return nil unless fs.present?
    fs.nested_format

  end


end