https://vite.dev/guide/static-deploy.html

docker stop $(docker ps -a -q)
docker rm -fv $(docker ps -aq)

docker compose up -d --no-deps --build

DONT USE PORT 80 insecure have main system port forward 80 to 8080
Check whats using port 80
lsof -i -P -n | grep 80

You’d still need nodemon or an equivalent agent if you want hot reloads. Mounting the source to a directory in the container via volumes allows the container VM to “see” code changes, but node by itself won’t restart just because the file system changed. The combination of nodemon and the volume mount will give you hot reloading inside the container. I use this development sometimes to ensure consistency with production environments.
Don't forget to add the -L option to be sure nodemon will work. https://github.com/remy/nodemon#application-isnt-restarting
