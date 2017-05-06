#Create the log file in case it doesn't exist
touch $HOME/script_log.txt

#Set docker login to AWS ECR
#We use $() because aws ecr get-login returns a
#docker login command
echo "$(date): Logging in to docker" >> $HOME/script_log.txt
$(aws ecr get-login)

#Stop the currently running docker service if it exists
echo "$(date): Stopping current backend-server" >> $HOME/script_log.txt
docker stop backend-server || true && docker rm backend-server || true

#Pull the latest version of the docker file
echo "$(date): Pull the latest version of the docker file" >> $HOME/script_log.txt
docker pull 116472260737.dkr.ecr.us-east-1.amazonaws.com/flox/backend-server

#Start the docker
echo "$(date): Start the server" >> $HOME/script_log.txt
docker run --name backend-server -p 80:3000 --env-file $HOME/backend.env --rm -d 116472260737.dkr.ecr.us-east-1.amazonaws.com/flox/backend-server
