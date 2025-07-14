FROM node:lts-alpine AS builder

WORKDIR /app

COPY app/package*.json ./
RUN npm install

COPY app ./
RUN npm run build

FROM node:lts-alpine AS runner

WORKDIR /app

COPY app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

ENV PORT=4000
EXPOSE 4000

CMD ["node", "dist/main.js"]