# 1. Build do Storybook estático
FROM node:22-alpine AS builder

WORKDIR /app

# Dependências
COPY package.json package-lock.json ./
RUN npm ci

# Código-fonte e build do Storybook
COPY . .
RUN npm run build-storybook

# Inventário de componentes para o gerador de missões, servido em
# /ds-componentes.json ao lado do Storybook. A imagem não recebe o `.git`
# (.dockerignore), então o commit chega por build-arg do workflow; o script
# falha se alguma marca sair vazia, e aí a imagem nem é gerada.
ARG DS_COMMIT=""
ARG DS_DATA_COMMIT=""
RUN DS_COMMIT="$DS_COMMIT" DS_DATA_COMMIT="$DS_DATA_COMMIT" \
    node scripts/gerar-inventario-componentes.mjs storybook-static/ds-componentes.json

# 2. Servidor Nginx ultra-leve para o Cloud Run
FROM nginx:alpine AS runner

# Configura Nginx para escutar na porta 8080 do Cloud Run
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados
COPY --from=builder /app/storybook-static /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
