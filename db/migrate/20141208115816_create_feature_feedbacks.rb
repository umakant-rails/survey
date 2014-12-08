class CreateFeatureFeedbacks < ActiveRecord::Migration
  def change
    create_table :feature_feedbacks do |t|
      t.boolean :interested, default: false
      t.boolean :not_interested, default: false
      t.integer :interested_priority
      t.integer :feature_id
      t.integer :user_id
      t.timestamps

      t.timestamps
    end
  end
end
