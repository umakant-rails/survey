class AddFieldMemberSurveyNumberInFeatureFeedback < ActiveRecord::Migration
  def change
    add_column :feature_feedbacks, :member_survey_number, :integer, :default => 0
  end
end
