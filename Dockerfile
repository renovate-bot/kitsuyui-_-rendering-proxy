FROM alpine:3.15
RUN apk --update --no-cache add nodejs-current yarn tini chromium
WORKDIR /app
RUN mkdir -p /app
ADD . /app
RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn
RUN yarn build
ENV CHROMIUM_EXECUTABLE=/usr/bin/chromium-browser
ENTRYPOINT ["tini", "--", "node", "dist/main.js"]
CMD ["server"]
EXPOSE 8080
