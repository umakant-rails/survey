class FeaturesController < ApplicationController
  before_action :authenticate_user!

  def index
    features = current_user.features
    nubmers_of_feature = Feature::NUMBER_OF_FEATURE - features.length
    respond_to do |format|
      format.html
      format.json { render json: {:features => features, :numbers_of_feature => nubmers_of_feature}}
    end
  end

  def create
    is_features_created = false;
    begin
      ActiveRecord::Base.transaction  do
        params[:features].each do | feature |
          params[:feature] = feature;
          current_user.features.create!(feature_params)
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
      params[:feature].permit("title", "user_id")
    end

end
