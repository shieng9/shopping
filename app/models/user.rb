class User < ApplicationRecord
    has_many :posts, dependent: :destroy
    before_save { self.email = email.downcase }
    # before_validation :downcase_email

    # email書式制限
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    # パスワード書式制限
    VALID_PASSWORD_REGEX = /\A[\w\-]+\z/

    validates :name, presence: true, length: {minimum: 1, maximum: 10}
    validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: VALID_EMAIL_REGEX }, length: {minimum: 1}
    validates :password_digest, presence: true, 
                                length: {minimum: 2}, 
                                format: {
                                    with: VALID_PASSWORD_REGEX,
                                    message: :invalid_password
                                },
                                allow_blank: true
                                has_secure_password

end
