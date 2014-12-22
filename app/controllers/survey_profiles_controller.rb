class SurveyProfilesController < ApplicationController
  before_filter :authenticate_user!, :only=>[:create, :edit, :update]

  def index
    survey_profiles = nil
    survey_profiles = SurveyProfile.order("updated_at DESC")
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
        :remaining_features_count => remaining_features_count,
        :current_user => current_user, :features => features}}
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

  def create_image_survey
    params[:survey_profile] = {survey_profile_type: SurveyProfile::SURVEY_PROFILE_TYPE[:image]}
    params[:survey_profile][:title] = "Image name - " + params[:file].original_filename
    survey_profile = current_user.survey_profiles.create!(survey_profiles_params)

    params[:image] = {image: params[:file]}
    params[:image][:name] = params[:file].original_filename
    image = Image.new(image_params)
    image.imageable = survey_profile
    if image.save
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

  def image_survey_show
    survey_profile = SurveyProfile.where(:id => params[:id]).first
    image = survey_profile.image
    feedback_questions = ImageQuestion.all
    respond_to do |format|
      format.html
      format.json { render json: {:success => true, :survey_profile => survey_profile,
        :image => image, :feedback_questions => feedback_questions, :current_user => current_user}}
    end
  end

  def image_profile_feedback
    image_survey_feedback_save = false
    survey_profile = SurveyProfile.where(:id => params[:id]).first
    image_survey_feedback = suvery_profile.image_survey_feedbacks.last rescue nil
    member_survey_number = image_survey_feedback.present? ? image_survey_feedback.member_survey_number : 0
    params[:survey_feedbacks].each do |survey_question |
      if survey_question[:xCoordinate].present? && survey_question[:yCoordinate].present?
        image_profile_feedback = survey_profile.image_survey_feedbacks.new
        image_profile_feedback[:image_question_id] = survey_question[:image_question_id]
        image_profile_feedback[:xcoordinate] = survey_question[:xCoordinate]
        image_profile_feedback[:ycoordinate] = survey_question[:yCoordinate]
        image_profile_feedback[:user_id] = current_user.present? ? current_user.id : nil
        image_profile_feedback[:member_survey_number] = member_survey_number.present? ? member_survey_number + 1 : 0
        if image_profile_feedback.save
          image_survey_feedback_save = true
        end
      end
    end

    respond_to do |format|
      format.html
      if image_survey_feedback_save
        format.json { render json: {:success => true, :message => "Successfully submitted Image Suvery feedbacks"}}
      else
        format.json { render json: {:success => false, :message => "Your action submitted feedback is failed"}}
      end
    end
  end

  def image_profile_feedback_report
    survey_profile = current_user.survey_profiles.where(:id => params[:id]).first
    image = survey_profile.present? ? survey_profile.image  : nil
    image_survey_feedbacks = ImageSurveyFeedback.joins(:image_question).where(:survey_profile_id => survey_profile.id).select("xcoordinate, ycoordinate, member_survey_number, marking_color") rescue nil
    if image_survey_feedbacks.present?
      respond_to do |format|
        format.html
        format.json { render json: {:success => true, :image_survey_feedbacks => image_survey_feedbacks, :current_user => current_user, :survey_profile => survey_profile, :image => image }}
      end
    else
      respond_to do |format|
        format.html
        format.json { render json: {:success => false, :image_survey_feedbacks => image_survey_feedbacks, :current_user => current_user, :survey_profile => survey_profile, :image => image }}
      end
    end
  end

  private
    def survey_profiles_params
      params[:survey_profile].permit( "id", "title", "description", "user_id", "survey_profile_type", "created_at", "updated_at");
    end
    def image_params
      params[:image].permit( "id", "name", "image", "imageable_id", "imageable_type", "survey_profile_type", "image_url", "created_at", "updated_at");
    end
    def image_survey_feedback_params
      params[:image_survey_feedback].permit("id", "profile_survey_id", "image_question_id", "xcoordinate", "ycoordinate", "member_survey_number", "user_id", "integer", "created_at", "updated_at");
    end

end
