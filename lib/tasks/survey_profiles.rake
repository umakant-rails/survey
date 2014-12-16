namespace :survey_profiles do
  desc "TODO"
  task set_survey_profile_type: :environment do
    survey_profiles = SurveyProfile.all
    survey_profiles.each do | survey_profile |
      if survey_profile.image.blank?
        survey_profile.update_attribute(:survey_profile_type, SurveyProfile::SURVEY_PROFILE_TYPE[:sorting])
      end
    end
  end

end
