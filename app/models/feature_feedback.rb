class FeatureFeedback < ActiveRecord::Base
  belongs_to :user
  belongs_to :feature
end
