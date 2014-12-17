class SurveyProfile < ActiveRecord::Base
  has_many :features
  has_many :feature_feedbacks
  belongs_to :user
  has_one :image, as: :imageable
  SURVEY_PROFILE_TYPE = {:sorting => 1, :image => 2}
  IMAGE_SURVEY_QUESTIONS =  [
    {"question" => "what do you like?", "color" => "#EBFDFF"},
    {"question" => "what do you dislike?", "color" => "#DFA6B1"},
    {"question" => "what is ambiguous?", "color" => "#5E95FF"}
  ]

end
