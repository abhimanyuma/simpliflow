docker stop frontend-server || true
docker stop backend-server || true
docker stop postgresql-server || true

cd $HOME/workspace/simpliflow/frontend
docker build -t frontend-server .

cd $HOME/workspace/simpliflow/backend
docker build -t backend-server .

docker run -p 5432:5432 --rm --name postgresql-server -v pgdata:/var/lib/postgresql/data -d postgres
docker run -p 8080:80 --rm  --name frontend-server -d frontend-server
docker run -it -p 3030:3000 --name backend-server --add-host=dockerhost:172.17.0.1 --rm -d backend-server
