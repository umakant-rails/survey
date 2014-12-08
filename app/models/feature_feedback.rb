class FeatureFeedback < ActiveRecord::Base
  belongs_to :feedback_submitter, :class_name => "User", :foreign_key => "user_id"
  belongs_to :feature
  belongs_to:survey_profile
end
