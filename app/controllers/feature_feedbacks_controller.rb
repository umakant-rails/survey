class FeatureFeedbacksController < ApplicationController
  before_filter :authenticate_user!, :except => [:create]

  def create
    is_feedback_submitted = false
    begin

      survey_profile = SurveyProfile.where(:id => params[:survey_profile_id]).first rescue nil
      feature_feedback = survey_profile.present? ? survey_profile.feature_feedbacks.last : nil
      member_survey_number = feature_feedback.present? ? feature_feedback.member_survey_number : 0

      ActiveRecord::Base.transaction  do
        params[:interested_feature] && params[:interested_feature].each do | feature |
          params[:feature_feedback] = {feature_id: feature[:id], interested: true, interested_priority: feature[:interestedPosition]}
          params[:feature_feedback][:user_id] = current_user.present? ? current_user.id : nil
          params[:feature_feedback][:member_survey_number] = member_survey_number + 1
          survey_profile.feature_feedbacks.create!(feature_feedback_params)
        end
        params[:non_interested_feature] && params[:non_interested_feature].each do | feature |
          params[:feature_feedback] = {feature_id: feature[:id], not_interested: true}
          params[:feature_feedback][:user_id] = current_user.present? ? current_user.id : nil
          params[:feature_feedback][:member_survey_number] = member_survey_number + 1
          survey_profile.feature_feedbacks.create!(feature_feedback_params)
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

  def feature_feedback_report
    survey_profile = SurveyProfile.where(:id => params[:survey_profile_id]).first
    features = survey_profile.features
    features_feedback = []
    visited_user = 0;

    features.each do | feature |
      temp_hash = {}
      temp_hash[:title] = feature.title
      temp_hash[:interested] = feature.feature_feedbacks.where(:interested => true).size
      interested_features_counts = nil

      interested_features_counts = feature.feature_feedbacks.where("interested=? and interested_priority is not null", true).group("interested_priority").select("count(*) feature_count, interested_priority") if feature.feature_feedbacks.present?

      interested_features_counts && interested_features_counts.each do |feature_count|
        temp_hash[:first] = feature_count.feature_count if feature_count.interested_priority == 1
        temp_hash[:second] = feature_count.feature_count if feature_count.interested_priority == 2
        temp_hash[:third] = feature_count.feature_count if feature_count.interested_priority == 3
      end
      temp_hash[:first] = temp_hash[:first].blank? ? 0 : temp_hash[:first]
      temp_hash[:second] = temp_hash[:second].blank? ? 0 : temp_hash[:second]
      temp_hash[:third] = temp_hash[:third].blank? ? 0 : temp_hash[:third]

      non_interested = feature.feature_feedbacks.where(:not_interested => true)
      temp_hash[:not_interested] = non_interested.blank? ? 0 : non_interested.size

      features_feedback[features_feedback.size] = temp_hash
    end
    visited_user = survey_profile.feature_feedbacks.present? ? survey_profile.feature_feedbacks.last.member_survey_number : 0

    respond_to do |format|
      format.html
      format.json { render json: {:success => true, :features_feedback => features_feedback,
        :visited_user => visited_user, :survey_profile => survey_profile}}
    end
  end

  private
    def feature_feedback_params
      params[:feature_feedback].permit( "interested", "not_interested", "interested_priority", "feature_id", "user_id", "survey_profile_id", "member_survey_number")
    end

end
