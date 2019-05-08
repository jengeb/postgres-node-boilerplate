FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/

RUN npm ci

COPY . /usr/src/app

EXPOSE 9000

CMD [ "node", "index.js" ]
