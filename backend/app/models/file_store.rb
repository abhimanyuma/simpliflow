class FileStore < ApplicationRecord
  has_attached_file :attached_file
  do_not_validate_attachment_file_type :attached_file

  before_save :update_hash

  def update_hash
    self.file_hash = Digest::SHA256.file(self.attached_file.path).hexdigest
  end

  def nested_format
    {
      name: self.attached_file_file_name,    #No, file_file is not an error
      size: self.attached_file_file_size,
      hash: self.file_hash,
      url: self.attached_file.url,
      content_type: self.attached_file_content_type
    }
  end
end
