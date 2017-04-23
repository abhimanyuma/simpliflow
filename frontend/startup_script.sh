$(aws ecr get-login)
docker stop frontend_server || true && docker rm frontend_server || true
docker pull 116472260737.dkr.ecr.us-east-1.amazonaws.com/flox/frontend-server
docker run -p 80:80 --name frontend_server -d 116472260737.dkr.ecr.us-east-1.amazonaws.com/flox/frontend-server
exit 0