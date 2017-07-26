class FileStore < ApplicationRecord
    has_attached_file :attached_file
    do_not_validate_attachment_file_type :attached_file

end
