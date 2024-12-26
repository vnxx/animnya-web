FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN NODE_ENV=production ANIMNYA_API_URL=https://animnya.bykevin.work/api GTM_ID=G-RXQN0KP15B npm run build

FROM alpine:latest AS release

WORKDIR /app

COPY --from=builder /app/out /app/public
COPY tiny-serve tiny-serve

ENV APP_PORT=80
ENV APP_DIRERCTORY_PATH=./public
ENV APP_DEBUG=false
ENV NOT_FOUND_PAGE_PATH=/404.html

EXPOSE 80

CMD ["./tiny-serve"]
