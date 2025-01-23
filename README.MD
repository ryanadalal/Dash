https://vite.dev/guide/static-deploy.html

docker stop $(docker ps -a -q)
docker rm -fv $(docker ps -aq)

docker compose up -d --no-deps --build

DONT USE PORT 80 insecure have main system port forward 80 to 8080
Check whats using port 80
lsof -i -P -n | grep 80 