FROM node:latest as build 
COPY . /app
WORKDIR /app
RUN npm install -g npm@latest \
    && npm install \
    && npm run build


FROM build as runner
COPY --from=build /app/dist /app
WORKDIR /app
ENTRYPOINT [ "node" ]
CMD [ "main.js" ]
