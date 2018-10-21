# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'httpclient'
tags = []
5.times do |i|
    client = HTTPClient.new
    res = client.get("https://qiita.com/api/v2/tags?page=#{i + 1}&per_page=100&sort=count")
    data = JSON.parse(res.body)
    p data
    data.each do |tag|
        tags << tag["id"]
    end
end
tags.each do |tag|
    Tag.create(name:tag)
end
