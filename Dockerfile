# Stage 1: deps — only production dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: builder — full build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: runner — distroless (no shell, no package manager, minimal attack surface)
FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy non-root user from builder (distroless has no adduser)
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

# Copy standalone output (includes node_modules needed at runtime)
COPY --from=builder --chown=nobody:nogroup /app/.next/standalone ./
COPY --from=builder --chown=nobody:nogroup /app/.next/static ./.next/static

USER nobody

EXPOSE 3000

CMD ["server.js"]
