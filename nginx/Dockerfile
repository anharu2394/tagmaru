FROM nginx
# Install dependencies
RUN apt-get update -qq && apt-get -y install apache2-utils
RUN apt-get update && \
  apt-get install -y certbot -t jessie-backports
# establish where Nginx should look for files
ENV RAILS_ROOT /var/www/tagmaru
# Set our working directory inside the image
WORKDIR $RAILS_ROOT
# create log directory
RUN mkdir log
# copy over static assets
COPY ./backend/public public/
# Copy Nginx config template
COPY nginx/nginx.conf /tmp/docker.nginx
# substitute variable references in the Nginx config template for real values from the environment 
# put the final config in its place
RUN envsubst '$RAILS_ROOT' < /tmp/docker.nginx > /etc/nginx/conf.d/default.conf

RUN apt-get update && apt-get install -y cron
RUN echo '00 0 * * 6 root /usr/bin/certbot renew >> /var/log/cron.log 2>&1' >> /etc/cron.d/certbot-cron
RUN chmod 0644 /etc/cron.d/certbot-cron
RUN touch /var/log/cron.log

EXPOSE 80 443
# Use the "exec" form of CMD so Nginx shuts down gracefully on SIGTERM (i.e. `docker stop`)
CMD cron && nginx -g 'daemon off;'
