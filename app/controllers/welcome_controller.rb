class WelcomeController < ApplicationController

  def index
    survey_profiles = SurveyProfile.all()

    respond_to do |format|
      format.html
      format.json { render json: {:success => true, :survey_profiles => survey_profiles}}
    end
  end

end
