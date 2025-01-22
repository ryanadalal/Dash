FROM node:23.6-alpine AS builder
WORKDIR /app
COPY . ./
RUN npm install
CMD ["npm", "run", "build"]

FROM busybox:1.35 AS runner
WORKDIR /home/static
COPY --from=builder /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]