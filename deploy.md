**Vue Deployment:** https://cli.vuejs.org/guide/deployment.html#github-pages

**Django Deployment:**

**Initial Django Project Setup on server**
```bash
#! /bin/bash

# Quite on any error
set -e

# conventional values that we'll use throughout the script
APPROOT=approotdirname
USER=serverusername
APPFOLDERPATH=/home/$USER/$APPROOT
PYTHON_VERSION=3
# Default python version to 3. OS has to have it installed.

# Determine requested Python version & subversion
PYTHON_VERSION_STR=`python3 -c 'import sys; ver = "{0}.{1}".format(sys.version_info[:][0], sys.version_info[:][1]); print(ver)'`

# Verify required python version is installed
echo
echo "***********************************************"
echo "Python version: $PYTHON_VERSION_STR"
echo "***********************************************"
echo

# Create virtual environment
echo
echo "***********************************************"
echo "Setting up python virtual environment ..."
echo "***********************************************"
echo
python3 -m venv $APPFOLDERPATH/venv

# Activet virtual venv
echo
echo "***********************************************"
echo "Activating python virtual environment ..."
echo "***********************************************"
echo
source $APPFOLDERPATH/venv/bin/activate

# upgrade pip
echo
echo "***********************************************"
echo "upgrading pip to latest version ..."
echo "***********************************************"
echo
pip install --upgrade pip || error_exist "Error upgrading pip to the latest version"

echo
echo "***********************************************"
echo "Installing base python packages for the app..."
echo "***********************************************"
echo
pip install -r requirements.txt || error_exist "Error installing project python dependences"

# ###################################################################
# Generate Django production secret key
# ###################################################################
echo
echo "***********************************************"
echo "Generating Django secret key... Use this secret key for production"
echo "***********************************************"
echo
DJANGO_SECRET_KEY=`openssl rand -base64 48`
if [ $? -ne 0 ]; then
    error_exit "Error creating secret key."
fi
echo "SECRET_KEY=$DJANGO_SECRET_KEY" >> ./.env

echo
echo "***********************************************"
echo "Setting up project"
echo "***********************************************"
echo

python manage.py makemigrations || error_exit "Makemigrations failed"
python manage.py migrate || error_exit "Migrating  failed"
echo
echo
echo "Run collect static file at the end of the script manually without sudo"
echo
echo
python manage.py collectstatic || error_exit "Collecting static files failed"
```

**Nginx Configuration and SSL**

```bash
#!/bin/bash

# Quite on any error
set -e


# Variables
USER=serveruser
GROUP=www-data
EMAIL=emailforssl
APPNAME=applicationname
DOMAINS="domain domain2 domain3"
APPDIR=appdirname
APPROOT=/home/$USER/$APPDIR
ENVDIR=venv
SOCKETPATH=/run/uwsgi/$APPNAME.sck
HTTP_NGINX_CONFIG=http
HTTPS_NGINX_CONFIG=https

echo "$APPNAME - $DOMAINS - $APPDIR - $APPROOT - $ENVDIR - $SOCKETPATH - $HTTP_NGINX_CONFIG - $HTTPS_NGINX_CONFIG"

echo
echo "*********************************************************************************"
echo "*********************************************************************************"
echo "**** Preparing server to deploy multiple django application with nginx uwsgi ****"
echo "*********************************************************************************"
echo "*********************************************************************************"
echo
echo
echo "****************************************************************"
echo "1. Creating directory /etc/uwsgi/vassals;   adding emperor.ini with uwsgi config"
echo "****************************************************************"
echo
mkdir --parents /etc/uwsgi/vassals

cat > /etc/uwsgi/emperor.ini << EOF
[uwsgi]
emperor                                     = /etc/uwsgi/vassals
EOF
echo "Done!"
echo "****************************************************************"

echo
echo "****************************************************************"
echo "2. Creating emperor service for watching vassals"
echo "****************************************************************"
echo
cat > /etc/systemd/system/emperor.uwsgi.service << EOF
[Unit]
Description                                 = uWSGI Emperor service
After                                       = syslog.target
After                                       = network.target
[Service]
ExecStart                                   = /usr/local/bin/uwsgi --ini /etc/uwsgi/emperor.ini
Restart                                     = always
RestartPreventExitStatus                    = 1
KillSignal                                  = SIGQUIT
Type                                        = notify
NotifyAccess                                = all
RuntimeDirectory                            = uwsgi
[Install]
WantedBy                                    = multi-user.target
EOF
echo "Done!"
echo "****************************************************************"

echo
echo "****************************************************************"
echo "3. Creating vassal ini for project"
echo "****************************************************************"
echo
cat > /etc/uwsgi/vassals/$APPNAME.ini << EOF
[uwsgi]
project                                     = $APPNAME
uid                                         = $USER
gid                                         = $GROUP
##########
# DJANGO #
##########
# Project Root
chdir                                       = $APPROOT
# Project wsgi module
module                                      = $APPNAME.wsgi:application
# Virtualenv full path
home                                        = $APPROOT/$ENVDIR
# Environment variables
# env                                       = DJANGO_SETTINGS_MODULE=$APPNAME.settings.production
# env                                       = DJANGO_ALLOWED_HOSTS=192.81.xx.xx
###########
# PROCESS #
###########
master                                      = true
# maximum number of workers
processes                                   = 1
# Socket location and related commands
socket                                      = $SOCKETPATH
chown-socket                                = $USER:$GROUP
chmod-socket                                = 666
# clear environment on exit
vacuum                                      = true
pidfile                                     = /tmp/uwsgi_$APPNAME.pid
harakiri                                    = 20
max-requests                                = 5000
EOF
echo "Done!"
echo "****************************************************************"

echo
echo "***********************************************"
echo "4./1 Setting up NGINX configs"
echo "***********************************************"
echo
mkdir -p $APPROOT/nginx $APPROOT/logs
cat > $APPROOT/nginx/nginx.conf << EOF
user                 www-data;
worker_processes     auto;
pid                  /run/nginx.pid;
worker_rlimit_nofile 65535;
include /etc/nginx/modules-enabled/*.conf;
events {
    multi_accept       on;
    worker_connections 65535;
}
http {
    charset              utf-8;
    sendfile             on;
    tcp_nopush           on;
    tcp_nodelay          on;
    log_not_found        off;
    types_hash_max_size  2048;
    client_max_body_size 50M;
    # MIME
    include              mime.types;
    default_type         application/octet-stream;
    # Limits
    limit_req_log_level  warn;
    limit_req_zone       \$binary_remote_addr zone=login:10m rate=10r/m;
    # SSL
    ssl_session_timeout  1d;
    ssl_session_cache    shared:SSL:10m;
    ssl_session_tickets  off;
    # Diffie-Hellman parameter for DHE ciphersuites
    ssl_dhparam          /etc/nginx/dhparam.pem;
    # Mozilla Intermediate configuration
    ssl_protocols        TLSv1.2 TLSv1.3;
    ssl_ciphers          ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    # OCSP Stapling
    ssl_stapling         on;
    ssl_stapling_verify  on;
    resolver             1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
    resolver_timeout     2s;
    # Load configs
    include              /etc/nginx/sites-enabled/*;
}
EOF

echo
echo "***********************************************"
echo "4.2 Backing up nginx original conf."
echo "***********************************************"
echo
# Backup original config if backup not exists
if [ ! -f /etc/nginx/nginx-original.conf ]; then
    mv /etc/nginx/nginx.conf /etc/nginx/nginx-original.conf
fi

echo
echo "***********************************************"
echo "4.2 Applying new conf"
echo "***********************************************"
echo
cp $APPROOT/nginx/nginx.conf /etc/nginx/nginx.conf

echo
echo "***********************************************"
echo "4.3 Creating general nginx conf"
echo "***********************************************"
echo
cat > $APPROOT/nginx/general.conf << EOF
# favicon.ico
location = /favicon.ico {
    log_not_found off;
    access_log    off;
}
# robots.txt
location = /robots.txt {
    log_not_found off;
    access_log    off;
}
# gzip
gzip              on;
gzip_vary         on;
gzip_proxied      any;
gzip_comp_level   6;
gzip_types        text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
EOF


echo
echo "***********************************************"
echo "4.4 Creating letsencrypt conf"
echo "***********************************************"
echo
cat > $APPROOT/nginx/letsencrypt.conf << EOF
# ACME-challenge
location ^~ /.well-known/acme-challenge/ {
    root /var/www/_letsencrypt;
}
EOF

echo
echo "***********************************************"
echo "4.5 Creating security nginx conf"
echo "***********************************************"
echo
cat > $APPROOT/nginx/security.conf << EOF
# security headers
add_header X-Frame-Options           "SAMEORIGIN" always;
add_header X-XSS-Protection          "1; mode=block" always;
add_header X-Content-Type-Options    "nosniff" always;
add_header Referrer-Policy           "no-referrer-when-downgrade" always;
add_header Content-Security-Policy   "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
EOF

echo
echo "****************************************************************"
echo "Creating nginx http conf for the $APPNAME for all domains"
echo "****************************************************************"
echo
for DOMAIN in ${DOMAINS}; do
echo
echo "****************************************************************"
echo "Creating nginx http conf for the $APPNAME for $DOMAIN"
echo "****************************************************************"
echo
APPNAME+=_uwsgi
cat > $APPROOT/nginx/$DOMAIN-$HTTP_NGINX_CONFIG.conf << EOF
    upstream $APPNAME {
        server unix://$SOCKETPATH fail_timeout=0;
    }
    # configuration of the server
    server {
        # the port your site will be served on
        listen      80;
        # the domain name it will serve for
        server_name $DOMAIN;
        charset     utf-8;
        # max upload size
        client_max_body_size 5M;
        access_log $APPROOT/logs/nginx-access.log;
        error_log $APPROOT/logs/nginx-error.log;
        # conf for letsencrypt ssl
        include     $APPROOT/nginx/letsencrypt.conf;
        # Django media
        location /media  {
            alias $APPROOT/media;
        }
        location /static {
            alias $APPROOT/static;
        }
        # non-media requests handled by uwsgi
        location / {
            include     /etc/nginx/uwsgi_params; # the uwsgi_params file from /etc/nginx/
            uwsgi_pass  $APPNAME;
        }
    }
EOF
echo
echo "***********************************************"
echo "Creating nginx https conf for the $APPNAME"
echo "***********************************************"
echo
cat > $APPROOT/nginx/$DOMAIN-$HTTPS_NGINX_CONFIG.conf << EOF
    upstream $APPNAME {
        server unix://$SOCKETPATH fail_timeout=0;
    }
    # HTTP redirect
    server {
        listen 80;
        server_name $DOMAIN;
        # client_max_body_size 5M;
        # keepalive_timeout 5;
        # underscores_in_headers on;
        # letsencrypt ssl conf
        include     $APPROOT/nginx/letsencrypt.conf;
        # This would redirect http site access to HTTPS.
        location / {
        return 301 https://\$host\$request_uri;
        }
    }
    # Remember to install the site certificate, either purcahased or generated.
    server {
        listen                  443 ssl http2;
        listen                  [::]:443 ssl http2;
        server_name             $DOMAIN;
        client_max_body_size    5M;
        keepalive_timeout       5;
        # SSL
        ssl_certificate         /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
        ssl_certificate_key     /etc/letsencrypt/live/$DOMAIN/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/$DOMAIN/chain.pem;
        # letsencrypt ssl conf
        include     $APPROOT/nginx/letsencrypt.conf;
        # security
        include                 $APPROOT/nginx/security.conf;
        # logging
        access_log              $APPROOT/logs/nginx-access.log;
        error_log               $APPROOT/logs/nginx-error.log warn;
        # Django media
        location /media  {
            alias $APPROOT/media;
        }
        location /static {
            alias $APPROOT/static;
        }
        # additional config
        include $APPROOT/nginx/general.conf;
        location / {
            include     /etc/nginx/uwsgi_params; # the uwsgi_params file from /etc/nginx/
            uwsgi_pass  $APPNAME;
        }
    }
EOF
echo
sudo cat $APPROOT/nginx/$DOMAIN-$HTTP_NGINX_CONFIG.conf
echo
echo "Done!"
echo "****************************************************************"


ln -sf $APPROOT/nginx/$DOMAIN-$HTTP_NGINX_CONFIG.conf /etc/nginx/sites-enabled/$DOMAIN
chown www-data $APPROOT/nginx

systemctl daemon-reload
systemctl restart emperor.uwsgi.service
systemctl restart nginx
# systemctl status emperor.uwsgi.service

echo
echo "***********************************************"
echo "SSL for $DOMAIN..."
echo "***********************************************"
echo
if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    echo
    echo "***********************************************"
    echo "Creating directory for challenge files"
    echo "***********************************************"
    mkdir -p /var/www/_letsencrypt
    chown www-data /var/www/_letsencrypt
    echo

    if [ ! -f /etc/nginx/dhparam.pem ]; then
        echo
        echo "***********************************************"
        echo "Generate Diffie-Hellman keys on server..."
        echo "***********************************************"
        openssl dhparam -out /etc/nginx/dhparam.pem 2048
    fi
    echo

    echo
    echo "***********************************************"
    echo "Obtain SSL certificates for $DOMAIN from Let's Encrypt using Certbot:"
    echo "***********************************************"
    certbot certonly --webroot -d $DOMAIN --email $EMAIL -w /var/www/_letsencrypt -n --agree-tos --force-renewal
    echo

    echo
    echo "***********************************************"
    echo "Registering certbot renewal pre and post hook to reload NGINX when it successfully renews certificates"
    echo "***********************************************"
    echo
    cat > /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh << EOF 
        #!/bin/bash
        sudo nginx -s reload
EOF
    chmod a+x /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh
else
    echo
    echo "***********************************************"
    echo "SSL for $DOMAIN already exists"
    echo "***********************************************"
    echo
fi

echo
echo "***********************************************"
echo "Applying https config for $APPNAME to nginx sites-enabled..."
echo "***********************************************"
echo
ln -sf $APPROOT/nginx/$DOMAIN-$HTTPS_NGINX_CONFIG.conf /etc/nginx/sites-enabled/$DOMAIN

systemctl restart nginx

done

echo "!Done"
echo "***********************************************"

```


**Update Project on server with latest version**

```bash
source venv/bin/activate

git pull origin main

python -m pip install -r requirements.txt

python manage.py collectstatic --noinput

python manage.py makemigrations

python manage.py migrate

sudo systemctl daemon-reload
sudo systemctl restart emperor.uwsgi.service
sudo systemctl restart nginx

```
