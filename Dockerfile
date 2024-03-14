# Paso 1: Construir la aplicación Angular
FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Paso 2: Servir la aplicación usando Nginx
FROM nginx:alpine
# Asegúrate de ajustar la siguiente línea para que coincida con la estructura de tu directorio
COPY --from=build /app/dist/comic-front/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

