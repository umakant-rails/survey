class SurveyProfilesController < ApplicationController
  before_filter :authenticate_user!, :only=>[:create, :edit, :update]

  def index
    survey_profiles = nil
    survey_profiles = SurveyProfile.all()
    respond_to do |format|
      format.html
      format.json { render json: {:success => true, :current_user => current_user, :survey_profiles => survey_profiles}}
    end
  end

  def create
    params[:survey_profile][:survey_profile_type] = SurveyProfile::SURVEY_PROFILE_TYPE[:sorting]
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
        :remaining_features_count => remaining_features_count, :current_user => current_user, :features => features}}
    end
  end

  def edit
    survey_profile = SurveyProfile.where(:id => params[:id]).first
    respond_to do |format|
      format.html
      format.json { render json: {:success => true, :survey_profile => survey_profile,
        :current_user => current_user}}
    end
  end

  def update
    survey_profile = SurveyProfile.where(:id => params[:id]).first
    if survey_profile.update_attributes(survey_profiles_params)
      respond_to do |format|
        format.html
        format.json { render json: {:success => true, :survey_profile => survey_profile,
          :current_user => current_user, :message => "Successfully update survey profile"}}
      end
    else
      respond_to do |format|
        format.html
        format.json { render json: {:success => false, :survey_profile => survey_profile,
          :current_user => current_user, :message => "Your action update survey profile is failed"}}
      end
    end
  end

  def destroy
    survey_profile = SurveyProfile.where(:id => params[:id]).first
    if survey_profile.destroy
      respond_to do |format|
        format.html
        format.json { render json: {:success => true, :survey_profile => survey_profile,
          :current_user => current_user, :message => "Successfully delete survey profile"}}
      end
    else
      respond_to do |format|
        format.html
        format.json { render json: {:success => false, :survey_profile => survey_profile,
          :current_user => current_user, :message => "Your action delete survey profile is failed"}}
      end
    end
  end

  private
    def survey_profiles_params
      params[:survey_profile].permit( "id", "title", "description", "user_id", "survey_profile_type", "created_at", "updated_at");
    end

end
