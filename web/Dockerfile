FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

RUN pnpm build

FROM base

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/.next/standalone ./
# COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/.next/static ./.next/static

CMD HOSTNAME="0.0.0.0" node server.js
