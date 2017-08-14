#Create the log file in case it doesn't exist
touch $HOME/script_log.txt

#Set docker login to AWS ECR
#We use $() because aws ecr get-login returns a
#docker login command
echo "$(date): Logging in to docker" >> $HOME/script_log.txt
$(aws ecr get-login)

#Stop the currently running docker service if it exists
echo "$(date): Stopping current frontend-server" >> $HOME/script_log.txt
docker stop frontend-server || true && docker rm frontend-server || true

#Pull the latest version of the docker file
echo "$(date): Pull the latest version of the docker file" >> $HOME/script_log.txt
docker pull 116472260737.dkr.ecr.us-east-1.amazonaws.com/flox/frontend-server

#Start the docker
echo "$(date): Start the server" >> $HOME/script_log.txt
docker run -p 80:80 --name frontend-server --rm -d 116472260737.dkr.ecr.us-east-1.amazonaws.com/flox/frontend-server
