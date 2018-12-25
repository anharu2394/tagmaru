class Tag < ApplicationRecord
    has_many :follow_tags
    has_many :posts
    has_many :users, through: :follow_tags
end
