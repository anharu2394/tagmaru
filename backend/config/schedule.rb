# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
require File.expand_path(File.dirname(__FILE__) + "/environment")

rails_env = ENV['RAILS_ENV'] || :development
set :environment, rails_env

# Example:
#
set :output, "log/crontab.log"
env :PATH, ENV['PATH']
every 1.day, :at => '4:00 am' do
     rake "post_save:qiita"
     rake "post_save:devto"
     rake "post_save:hateb"
  #   rake "post_save:qrunch"
end
=begin
 every 1.day, :at => '10:00 am' do
     rake "tweet:tweet"
end
 every 1.day, :at => '4:00 pm' do
     rake "tweet:tweet"
end
 every 1.day, :at => '8:00 pm' do
     rake "tweet:tweet"
end
=end
