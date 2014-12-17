class CreateImageQuestions < ActiveRecord::Migration
  def change
    create_table :image_questions do |t|
      t.string :question
      t.string :marking_color

      t.timestamps
    end
  end
end
