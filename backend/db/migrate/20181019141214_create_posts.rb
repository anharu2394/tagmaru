class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :url
      t.integer :fab_count
      t.date :posted_at
      t.string :provider
      t.references :tag, foreign_key: true
      t.timestamps
    end
  end
end
