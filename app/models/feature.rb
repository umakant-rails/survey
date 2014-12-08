class Feature < ActiveRecord::Base
  NUMBER_OF_FEATURE = 15;
  has_many :feature_feedbacks
  belongs_to :survey_profile
end
