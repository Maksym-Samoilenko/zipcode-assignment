FROM node:16.16
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 
RUN npm install -g typescript
RUN npm install -g ts-node
COPY . .
RUN tsc
RUN npm test
CMD ["node","dist/app.js"]
