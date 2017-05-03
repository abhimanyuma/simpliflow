$(aws ecr get-login)
docker stop backend-server || true && docker rm backend-server || true
docker pull 116472260737.dkr.ecr.us-east-1.amazonaws.com/flox/backend-server
docker run --name backend-server -p 80:3000 --env-file backend.env -rm -d 116472260737.dkr.ecr.us-east-1.amazonaws.com/flox/backend-server
exit 0