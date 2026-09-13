# Build context: repository root
# Produces a static nginx image with use-case UI + packed template ZIPs

FROM node:20-bookworm-slim AS build

RUN apt-get update \
  && apt-get install -y --no-install-recommends zip \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
COPY scripts ./scripts
COPY PROJECT_USE_CASES.md ./
COPY boilerplate-library ./boilerplate-library
COPY showcase/package.json ./showcase/

RUN npm --prefix showcase install

COPY showcase ./showcase

RUN npm run sync:use-cases \
  && npm run pack:templates \
  && npm --prefix showcase run build

FROM nginx:1.27-alpine AS runtime

COPY showcase/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/showcase/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
