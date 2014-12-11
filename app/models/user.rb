class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable #, :confirmable

  has_many :feature_feedbacks
  has_many :survey_profiles
  belongs_to :role
end
