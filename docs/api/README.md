# API

## /api/1.0/create_task/

> Task creation

### Method
POST

### Request json data
```
{
    "name": string,
    "description": string (not required),
    "priority": integer (not required),
    "status": string (not required),
    "tags": [
        integer
        ...
    ] (not required)
}
```

### Response json data
```
{
    "id": integer,
    "creator": integer,
    "responsible": integer,
    "name": string,
    "description": string,
    "priority": integer,
    "status": string,
    "creation_datetime": ISO 8601 datetime string
}
```

### Authorization header
`Authorization: Token ${api_token_value}`

## /api/1.0/update_task/1/

> User task updation

### Method
PATCH

### Request json data
```
{
    "name": string (not required),
    "description": string (not required),
    "priority": integer (not required),
    "status": string (not required),
    "tags": [
        integer
        ...
    ] (not required)
}
```

### Response json data
```
{
    "id": integer,
    "creator": integer,
    "responsible": integer,
    "name": string,
    "description": string,
    "priority": integer,
    "status": string,
    "creation_datetime": ISO 8601 datetime string
}
```

### Authorization header
`Authorization: Token ${api_token_value}`

## /api/1.0/user_tasks/

> User tasks list

### Method
GET

### Response json data
```
[
    {
        "id": integer,
        "creator": {
            "id": integer,
            "username": string,
            "first_name": string,
            "last_name": string,
        },
        "responsible": {
            "id": integer,
            "username": string,
            "first_name": string,
            "last_name": string,
        },
        "name": string,
        "description": string,
        "priority": integer,
        "status": string,
        "creation_datetime": ISO 8601 datetime string,
        "tags": [
            {
                "id": integer,
                "name": string
            },
            ...
        ]
    }
    ...
]
```

### Authorization header
`Authorization: Token ${api_token_value}`

## /api/1.0/search_user_tasks/

> Search user tasks by search string in name and description

### Method
GET

### GET params
```
{
    "search": string
}
```

### Response json data
```
[
    {
        "id": integer,
        "creator": {
            "id": integer,
            "username": string,
            "first_name": string,
            "last_name": string,
        },
        "responsible": {
            "id": integer,
            "username": string,
            "first_name": string,
            "last_name": string,
        },
        "name": string,
        "description": string,
        "priority": integer,
        "status": string,
        "creation_datetime": ISO 8601 datetime string,
        "tags": [
            {
                "id": integer,
                "name": string
            },
            ...
        ]
    }
    ...
]
```

### Authorization header
`Authorization: Token ${api_token_value}`
