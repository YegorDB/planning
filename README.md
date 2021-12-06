# Planning

> Tasks management tool


## Stack
- Nginx
- Django, Django Rest Framework
- Postgesql
- Gulp
- React
- jQuery
- Less


## Requirements
- docker>=19.03
- docker-compose>=1.25


## Production

### Images generation
- Django `$ docker build -t planning/django:a.b.c env/django/`
> a.b.c is image version (same as project version)

### Deployment
`$ docker-compose up`


## Development

### Deployment
`$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`

> More information about development in project wiki  


## Usage

### Pages
- Tasks page `/tasks/`
- Task page `/task/${pk}/`

### API
- Create task `/api/1.0/create_task/`
- User tasks `/api/1.0/user_tasks/`
- Search user tasks `/api/1.0/search_user_tasks/`
- Update task `/api/1.0/update_task/${pk}/`

> More information about API in project docs
