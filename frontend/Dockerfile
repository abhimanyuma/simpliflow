FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/conf.d/examplessl.conf
COPY src/config/nginx.conf /etc/nginx/conf.d/default.conf

#Setup logging on a volume so that we get all logs in one
#place
VOLUME /var/log/nginx/log

RUN mkdir /dist_html
COPY dist /dist_html
VOLUME /dist_html
