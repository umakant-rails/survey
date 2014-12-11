class SurveyProfilesController < ApplicationController
  before_filter :authenticate_user!, :only=>[:create]

  def index
    survey_profiles = nil
    #if current_user
     # survey_profiles = SurveyProfile.where.not(:user_id => current_user.id)
    #else
      survey_profiles = SurveyProfile.all()
    #end
    respond_to do |format|
      format.html
      format.json { render json: {:success => true, :current_user => current_user, :survey_profiles => survey_profiles}}
    end
  end

  def create
    survey_profile = current_user.survey_profiles.create!(survey_profiles_params)
    if survey_profile
      respond_to do |format|
        format.html
        format.json { render json: {:success => true, :survey_profile => survey_profile, :message => "Successfully created survey profile"}}
      end
    else
      respond_to do |format|
        format.html
        format.json { render json: {:success => false, :message => "Your action survey profile action is failed"}}
      end
    end
  end

  private
    def survey_profiles_params
      params[:survey_profile].permit( "title", "description");
    end

end
