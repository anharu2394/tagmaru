class User < ApplicationRecord
            # Include default devise modules.
       #     devise :database_authenticatable, :registerable,
        #            :recoverable, :rememberable, :trackable, :validatable,
         #           :confirmable, :omniauthable, omniauth_providers: [:twitter]
  devise :rememberable, :omniauthable, omniauth_providers: [:twitter]        
  include DeviseTokenAuth::Concerns::User
  has_many :follow_tags
  has_many :tags, through: :follow_tags

end
