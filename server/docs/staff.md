# Staff
## Create
`POST /api/users/staff`

### Parameters
| Name       | Type   | Notes    |
|------------|--------|----------|
| `name`     | String | Required |
| `title`    | String | Required |
| `salary`   | Number | Required |

```json
{
  "name": "John Doe",
  "title": "Store Manager",
  "salary": 60000
}
```

### Response
If a staff member was successfully created:

```
Status 201
```

```json
{
  "id": 1
}
```

If something went wrong:

```
Status 500
```

```json
{
  "message": "An internal server error occurred"
}
```

## Get

`GET /api/users/staff`

### Response
On success returns a list with staff members:

```
Status 200
```

```json
[
  {
    "id": 10,
    "name": "John Doe",
    "title": "Store Manager",
    "salary": 60000
  }
]
```

On failure:

```
Status 500
```

```json
{
  "message": "An internal server error occurred"
}
```

## GetId

`GET /api/users/staff/:id`

### Response
On success returns a single staff member with all corresponding objects (addresses):

```
Status 200
```

```json
{
  "id": 10,
  "name": "John Doe",
  "title": "Store Manager",
  "salary": 60000,
  "addresses": [{
    "id": 5,
    "streetaddress": "123 South Boulevard",
    "state": "OH",
    "city": "London",
    "zip": "43140"
  }],
}
```

On failure:

```
Status 500
```

```json
{
  "message": "An internal server error occurred"
}
```

## Update
`PUT /api/users/staff/:id`

### Parameters
| Name     | Type   | Notes    |
|----------|--------|----------|
| `name`   | String | Optional |
| `title`  | String | Optional |
| `salary` | Number | Optional |


```json
{
  "name": "John Doe",
  "title": "Store Manager",
  "salary": 60000
}
```

### Response
If a staff member was successfully updated:

```
Status 200
```

```json
{
  "id": 1
}
```

If something went wrong:

```
Status 500
```

```json
{
  "message": "An internal server error occurred"
}
```

## Delete

`DELETE /api/users/staff/:id`

### Response
If successfully deleted:

```
Status 200
```

```json
{
  "id": 1
}
```

On failure:

```
Status 500
```

```json
{
  "message": "An internal server error occurred"
}
```
