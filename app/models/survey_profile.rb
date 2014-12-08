class SurveyProfile < ActiveRecord::Base
  has_many :features
  has_many :feature_feedbacks
  belongs_to :user
end
