class User < ApplicationRecord
  has_many :follow_tags
  has_many :tags, through: :follow_tags
end
