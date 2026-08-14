# --- Stage 1: Build Frontend & Backend Dependencies ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install frontend dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy frontend code & build Next.js standalone
COPY . .
ENV NEXT_PUBLIC_API_URL="/api"
RUN npm run build

# Install backend dependencies
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

# --- Stage 2: Production Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy backend app
COPY --from=builder /app/backend /app/backend

# Copy Next.js standalone app
COPY --from=builder /app/public /app/public
COPY --from=builder /app/.next/standalone /app/
COPY --from=builder /app/.next/static /app/.next/static

# Copy startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 3000

CMD ["/app/start.sh"]
