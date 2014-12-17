class SurveyProfile < ActiveRecord::Base
  has_many :features
  has_many :feature_feedbacks
  belongs_to :user
  has_one :image, as: :imageable
  has_many :image_survey_feedbacks
  SURVEY_PROFILE_TYPE = {:sorting => 1, :image => 2}
 end
