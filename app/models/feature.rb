class Feature < ActiveRecord::Base
  NUMBER_OF_FEATURE = 15;
  belongs_to :user
  has_many :feature_feedbacks
end
