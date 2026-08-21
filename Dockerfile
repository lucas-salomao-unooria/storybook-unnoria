# 1. Build do Storybook estático
FROM node:22-alpine AS builder

WORKDIR /app

# Dependências
COPY package.json package-lock.json ./
RUN npm ci

# Código-fonte e build do Storybook
COPY . .
RUN npm run build-storybook

# 2. Servidor Nginx ultra-leve para o Cloud Run
FROM nginx:alpine AS runner

# Configura Nginx para escutar na porta 8080 do Cloud Run
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados
COPY --from=builder /app/storybook-static /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
