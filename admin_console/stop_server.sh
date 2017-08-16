#Create the log file in case it doesn't exist
touch $HOME/script_log.txt

#Stop the currently running docker service if it exists
echo "$(date): Stopping current frontend-server" >> $HOME/script_log.txt
docker stop frontend-server || true && docker rm frontend-server || true
