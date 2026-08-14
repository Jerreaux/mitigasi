# --- Stage 1: Build Frontend & Backend Dependencies ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install frontend dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy project code & build Next.js standalone
COPY . .
ENV NEXT_PUBLIC_API_URL="/api"
RUN npm run build

# Install production dependencies for backend
WORKDIR /app/backend
RUN npm ci --omit=dev

# --- Stage 2: Production Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy Next.js standalone app first
COPY --from=builder /app/.next/standalone /app/
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public /app/public

# Copy backend node_modules specifically
COPY --from=builder /app/backend/node_modules /app/backend/node_modules

# Copy startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 3000

CMD ["/app/start.sh"]
