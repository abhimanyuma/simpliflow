module FileOperations
  extend ActiveSupport::Concern


  def upload_file(file, field = :file_store)

    fs = FileStore.create({attached_file: file})

    self[field] = fs

    return self[field].present?

  end


end