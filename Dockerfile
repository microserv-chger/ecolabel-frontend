# =========================
# BUILD STAGE
# =========================
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# =========================
# RUNTIME STAGE
# =========================
FROM nginx:1.25-alpine

# Supprimer config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier config SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier build
COPY --from=build /app/dist /usr/share/nginx/html

# Donner les droits nécessaires
RUN chown -R nginx:nginx /usr/share/nginx/html \
    /var/cache/nginx \
    /var/run

# IMPORTANT : ne PAS changer USER
# nginx démarre en root puis drop privileges automatiquement

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
