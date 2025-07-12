#!/bin/bash

domains=(pepsmonitor.com www.pepsmonitor.com)
rsa_key_size=4096
data_path="./data/certbot"
email="alexandrospeponis1999@gmail.com" 
staging="" 

if [ -d "$data_path" ]; then
  read -p "Existing data found. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

mkdir -p "$data_path/www"
docker compose -f docker-compose.prod.yml run --rm --entrypoint "\
  mkdir -p /var/www/certbot" nginx
docker compose -f docker-compose.prod.yml run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
  --email $email --agree-tos --no-eff-email \
  -d pepsmonitor.com -d www.pepsmonitor.com \
  $staging" certbot
