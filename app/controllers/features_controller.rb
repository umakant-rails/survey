class FeaturesController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html
      format.json { render json: {:numbers_of_feature => Feature::NUMBER_OF_FEATURE}}
    end
  end
end
