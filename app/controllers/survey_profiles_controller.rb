class SurveyProfilesController < ApplicationController
  before_filter :authenticate_user!, :only=>[:create]

  def index
    survey_profiles = nil
    survey_profiles = SurveyProfile.all()
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

  def show
    survey_profile = SurveyProfile.where(:id => params[:id]).first
    features = survey_profile.features
    remaining_features_count = Feature::NUMBER_OF_FEATURE - features.length
    respond_to do |format|
      format.html
      format.json { render json: {:success => true, :survey_profile => survey_profile,
        :remaining_features_count => remaining_features_count, :features => features}}
    end
  end

  private
    def survey_profiles_params
      params[:survey_profile].permit( "title", "description");
    end

end
