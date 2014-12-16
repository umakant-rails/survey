class AddSurveyTypeFieldInSurveyProfileModel < ActiveRecord::Migration
  def change
    add_column :survey_profiles, :survey_profile_type, :string
  end
end
