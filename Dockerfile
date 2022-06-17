FROM node:16-alpine

WORKDIR /run

COPY package.json .
COPY yarn.lock .

RUN yarn install --production=true

COPY ./dist ./dist

ENV NODE_ENV=production
ENV PORT=3000
ENV IMAGE_STORAGE=/data/images
ENV SECRET_KEY=change-it

EXPOSE 3000

CMD [ "node", "./dist/index.js" ]
