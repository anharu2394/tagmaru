FROM ruby:2.4.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /backend
WORKDIR /backend
COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend/Gemfile.lock
RUN gem install bundler -v "1.16.6"
RUN bundle install

COPY crontab /var/spool/cron/crontabs/root

COPY . /backend

RUN apt-get install -y cron

RUN service cron restart

# RUN bundle exec whenever  --update-crontab
