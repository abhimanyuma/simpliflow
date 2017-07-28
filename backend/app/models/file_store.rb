class FileStore < ApplicationRecord
  has_attached_file :attached_file
  do_not_validate_attachment_file_type :attached_file

  after_create :update_hash_with_save
  before_update :update_hash

  before_save :custom_validator

  EXPIRE_TIME = 15.minutes

  def update_hash
    updated_file = self.attached_file.queued_for_write[:original]
    if updated_file.present? and updated_file.path.present?
      self.file_hash = Digest::SHA256.file(updated_file.path).hexdigest
    end
  end

  def update_hash_with_save
    self.update_hash
    self.save!
  end

  def nested_format
    {
      name: self.attached_file_file_name,    #No, file_file is not an error
      size: self.attached_file_file_size,
      hash: self.file_hash,
      url: self.attached_file.expiring_url(EXPIRE_TIME),
      content_type: self.attached_file_content_type,
      source: "ONLINE"
    }
  end

end
