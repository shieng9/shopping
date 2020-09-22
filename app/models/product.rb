class Product < ApplicationRecord
    belongs_to :user

    validates :name, presence: true
    validates :goods, presence: true
    validates :quantity, presence: true
    validates :totalPrice, presence: true

end
