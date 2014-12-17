class CreateImageSurveyFeedbacks < ActiveRecord::Migration
  def change
    create_table :image_survey_feedbacks do |t|
      t.integer :survey_profile_id
      t.integer :image_question_id
      t.float :xcoordinate
      t.float :ycoordinate
      t.integer :member_survey_number
      t.string :user_id

      t.timestamps
    end
  end
end
