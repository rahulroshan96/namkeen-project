python3 manage.py makemigrations
python3 manage.py migrate
#nohup uwsgi --socket 0.0.0.0:8000 --home /var/www/namkeen-project/env3/ --chdir /var/www/namkeen-project/ --wsgi-file backend/wsgi.py --hook-asap chdir:/var/www/namkeen-project/env3/ &
