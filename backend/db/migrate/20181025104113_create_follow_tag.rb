class CreateFollowTag < ActiveRecord::Migration[5.1]
  def change
    create_table :follow_tags do |t|
      t.references :user, foreign_key: true
      t.references :tag, foreign_key: true
      t.timestamps
    end
  end
end

