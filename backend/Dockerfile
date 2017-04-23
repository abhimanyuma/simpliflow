FROM ruby:2.3


RUN apt-get update -qq && apt-get install -y build-essential libpq-dev postgresql-client
ENV RAILS_ROOT /var/www/docker_example
RUN mkdir -p $RAILS_ROOT/tmp/pids
RUN mkdir -p $RAILS_ROOT/config/shared/sockets

WORKDIR $RAILS_ROOT

RUN cd $RAILS_ROOT

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN gem install bundler
RUN bundle install --path vendor/cache

COPY . .

CMD [ "bash", "config/containers/app_start.sh" ]
