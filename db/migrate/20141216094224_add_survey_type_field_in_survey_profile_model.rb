class AddSurveyTypeFieldInSurveyProfileModel < ActiveRecord::Migration
  def change
    add_column :survey_profiles, :survey_profile_type, :integer
  end
end
