class FeaturesController < ApplicationController
  before_filter :authenticate_user!, :except=>[:index]

  def index
    survey_profile = SurveyProfile.where(:id => params[:survey_profile_id]).first
    if survey_profile
      features = survey_profile.features
      nubmers_of_feature = Feature::NUMBER_OF_FEATURE - features.length
      respond_to do |format|
        format.html
        format.json { render json: {:success => true, :survey_profile => survey_profile, :features => features, :numbers_of_feature => nubmers_of_feature}}
      end
    else
      respond_to do |format|
        format.html
        format.json { render json: {:success => false, :message => "Your requested Survey Profile does not exist" }}
      end
    end
  end

  def create
    is_features_created = false;
    begin
      ActiveRecord::Base.transaction  do
        params[:features].each do | feature |
          params[:feature] = feature;
          Feature.create!(feature_params)
          is_features_created = true
        end
      end
    rescue Exception => exp
      is_features_created = false
    end
    if is_features_created
      respond_to do |format|
        format.html
        format.json { render json: {:success => true, :message => "Successfully created features"}}
      end
    else
      respond_to do |format|
        format.html
        format.json { render json: {:success => false, :message => "Your action create feature failed"}}
      end
    end
  end

  private

    def feature_params
      params[:feature].permit("title", "survey_profile_id")
    end

end
