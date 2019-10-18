FROM node:10.16

# Prepare app directory
RUN mkdir -p /var/www/finance-react
WORKDIR /var/www/finance-react

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN apt-get update && apt-get install tofrodos

RUN chmod +x /docker-entrypoint.sh
RUN fromdos /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

# Install sources
ADD ./ /var/www/finance-react

RUN npm i npm@latest -g

RUN npm i npm@latest -g

RUN cd /var/www/finance-react && \
	NODE_ENV=development && \
    npm install

RUN cd /var/www/finance-react && \
	NODE_ENV=production && \
    npm install -g pm2 && \
    npm install

CMD ["pm2", "start", "pm2.yml", "--no-daemon"]

EXPOSE 3000