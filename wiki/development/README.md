# Development


## Static files

### Original files paths
- Original static files are placed in `src/gulp/src` in django static directories maneer

### Files compilation
- Gulp compiles files on fly and save them to django static directories
- Then django need to collect static files `$ docker-compose exec django python manage.py collectstatic --noinput`


## Base color scheme
- #e8505b
- #f9d56e
- #f3ecc2
- #14b1ab
