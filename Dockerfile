FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN NODE_ENV=production ANIMNYA_API_URL=https://animnya.bykevin.work/api GTM_ID=G-RXQN0KP15B npm run build

FROM nginx:mainline-alpine3.20-slim AS release

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
