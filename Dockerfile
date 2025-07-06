# 1 – Installer les dépendances avec Bun
FROM oven/bun:1 AS dependencies
WORKDIR /home/app
# copier lockfile Bun + package.json pour un install reproductible
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# 2 – Builder votre app Next.js
FROM node:18-alpine AS builder
WORKDIR /home/app
# réutiliser les node_modules installés
COPY --from=dependencies /home/app/node_modules ./node_modules
COPY . .

COPY .env.production .env

# build Next.js standalone
ENV NEXT_TELEMETRY_DISABLED=1
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
RUN npm run build

# 3 – Image de runtime légère
FROM node:18-alpine AS runner
WORKDIR /home/app
ENV NEXT_TELEMETRY_DISABLED=1
# copier uniquement l’artefact standalone et les fichiers publics
COPY --from=builder /home/app/.next/standalone ./standalone
COPY --from=builder /home/app/public ./standalone/public
COPY --from=builder /home/app/.next/static ./standalone/.next/static
EXPOSE 3000
ENV PORT=3000
CMD ["node", "./standalone/server.js"]
