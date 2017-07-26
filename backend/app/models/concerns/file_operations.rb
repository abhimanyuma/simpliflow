module FileOperations
  extend ActiveSupport::Concern


  def upload_file(att_file, field = :file_store)
    print(att_file)
    fs = FileStore.new()
    fs.attached_file = att_file
    fs.save!

    self["#{field}_id".to_sym] = fs.id

    return self["#{field}_id".to_sym].present?

  end


end