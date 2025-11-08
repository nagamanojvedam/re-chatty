# ---------------------------
# STAGE 1: Build Frontend
# ---------------------------
FROM node:22-alpine AS frontend-builder
RUN corepack enable

WORKDIR /app/ui

# Copy package files
COPY ui/package.json ui/pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm config set node-linker hoisted
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY ui .
RUN pnpm run build


# ---------------------------
# STAGE 2: Build Backend
# ---------------------------
FROM node:22-alpine AS backend-builder
RUN corepack enable

WORKDIR /app/api

# Copy backend package files and install deps
COPY api/package.json api/pnpm-lock.yaml* ./
RUN pnpm config set node-linker hoisted
RUN pnpm install --frozen-lockfile

# Copy backend source code
COPY api .


# ---------------------------
# FINAL STAGE: Runner
# ---------------------------
FROM node:22-alpine AS runner
RUN corepack enable

WORKDIR /app

# Copy backend (including node_modules)
COPY --from=backend-builder /app/api ./api

# Copy only frontend build output
COPY --from=frontend-builder /app/ui/dist ./ui/dist

# Expose backend port
EXPOSE 5000


# Start backend server
WORKDIR /app/api
CMD ["pnpm", "start"]
