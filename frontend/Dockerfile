# Frontend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

# installer TypeScript et types avant le build (sans modifier package.json)
RUN npm install typescript @types/react @types/node --no-save

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]
