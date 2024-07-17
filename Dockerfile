# --------------> The build image__
FROM node:latest AS development
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci

# --------------> The Compilation image__
FROM node:20.13.1-bookworm-slim AS build
USER node
WORKDIR /usr/src/app
COPY --chown=node:node package*.json /usr/src/app/
COPY --chown=node:node --from=development /usr/src/app/node_modules /usr/src/app/node_modules

# Copy app source files into image
COPY --chown=node:node . /usr/src/app/

# Building requires permissions to create the dist folder which the node user doesn't have
USER root
# Build application which produces a production bundle stored in the dist folder
RUN npm run build

USER node

# Install only productiion dependencies, Overwrites the existing node modules
RUN npm ci --omit=dev

# --------------> The production image__
FROM node:20.13.1-bookworm-slim
USER node
# ENV NODE_ENV production
COPY --from=development /usr/bin/dumb-init /usr/bin/dumb-init
WORKDIR /usr/src/app
USER root
RUN chown node:node /usr/src/app
USER node
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app
CMD ["dumb-init", "node", "main.js"]
