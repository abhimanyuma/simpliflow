#Create the log file in case it doesn't exist
touch $HOME/script_log.txt

#Stop the currently running docker service if it exists
echo "$(date): Stopping current backend-server" >> $HOME/script_log.txt
docker stop backend-server || true && docker rm backend-server || true
