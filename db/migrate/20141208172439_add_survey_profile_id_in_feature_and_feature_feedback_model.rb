class AddSurveyProfileIdInFeatureAndFeatureFeedbackModel < ActiveRecord::Migration
  def change
    add_column :features, :survey_profile_id, :integer
    add_column :feature_feedbacks, :survey_profile_id , :integer
    remove_column :features, :user_id
  end
end
