#Create the log file in case it doesn't exist
touch $HOME/script_log.txt

#Stop the currently running docker service if it exists
echo "$(date): Stopping current api-server" >> $HOME/script_log.txt
docker stop api-server || true && docker rm api-server || true
