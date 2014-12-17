class ImageSurveyFeedback < ActiveRecord::Base
  belongs_to :survey_profile
  belongs_to :image_question
end
