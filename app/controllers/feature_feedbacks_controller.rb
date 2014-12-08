class FeatureFeedbacksController < ApplicationController
  before_action :authenticate_user!

  def create
    is_feedback_submitted = false
    begin
      ActiveRecord::Base.transaction  do
        params[:interested_feature].each do | feature |
          params[:feature_feedback] = {feature_id: feature[:id], interested: true, interested_priority: feature[:interestedPosition]}
          FeatureFeedback.create!(feature_feedback_params)
        end
        params[:non_interested_feature].each do | feature |
          params[:feature_feedback] = {feature_id: feature[:id], not_interested: true}
          FeatureFeedback.create!(feature_feedback_params)
        end
      end
      is_feedback_submitted = true;
    rescue Exception => exp
      is_feedback_submitted = false
    end

    if is_feedback_submitted
      respond_to do |format|
        format.html
        format.json { render json: {:success => true, :message => "Successfully submitted feature feedbacks"}}
      end
    else
      respond_to do |format|
        format.html
        format.json { render json: {:success => false, :message => "Your action submitted feedback is failed"}}
      end
    end
  end

  private
    def feature_feedback_params
      params[:feature_feedback].permit( "interested", "not_interested", "interested_priority", "feature_id", "user_id")
    end

end
