# Multi-stage: build CSS, then serve with nginx
# Stage 1 — CSS build
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --prefer-offline
COPY static/css/input.css ./static/css/input.css
COPY index.html blog/ projects/ about/ contact/ fixtures/ ./
RUN npm run build:css

# Stage 2 — nginx static server
FROM public.ecr.aws/docker/library/nginx:1.27-alpine
COPY --from=build /app/static/css/styles.css /usr/share/nginx/html/static/css/styles.css
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY static/ /usr/share/nginx/html/static/
COPY fixtures/ /usr/share/nginx/html/fixtures/
COPY index.html /usr/share/nginx/html/index.html
COPY blog/ /usr/share/nginx/html/blog/
COPY projects/ /usr/share/nginx/html/projects/
COPY about/ /usr/share/nginx/html/about/
COPY contact/ /usr/share/nginx/html/contact/
EXPOSE 80
