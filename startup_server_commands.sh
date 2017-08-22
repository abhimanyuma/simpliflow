docker stop admin-console-server || true
docker stop api-server || true
#  docker stop postgresql-server || true

cd $HOME/workspace/simpliflow/admin_console
docker build -t admin-console-server .

# cd $HOME/workspace/simpliflow/flow_viewer
# docker build -t flow-viewer-server .

cd $HOME/workspace/simpliflow/api_backend
docker build -t api-server .

docker run -p 5432:5432 --rm --name postgresql-server -v pgdata:/var/lib/postgresql/data -d postgres
docker run -p 8080:80 --rm  --name admin-console-server -d admin-console-server
# docker run -p 8081:80 --rm  --name flow-viewer-server -d flow-viewer-server
docker run -it -p 3030:3000 --name api-server --add-host=dockerhost:172.17.0.1 --rm -d api-server
