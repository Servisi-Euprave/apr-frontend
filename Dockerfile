# base image
FROM node:18.16.0

# set working directory
WORKDIR /app
# install and cache app dependencies
COPY package.json .
# add app
RUN npm install
RUN npm install -g @angular/cli@15.2.6

COPY ./src ./src
COPY ./tsconfig.spec.json ./tsconfig.app.json ./tsconfig.json ./angular.json  ./


# start app
CMD ng serve --host 0.0.0.0 --configuration='production'
