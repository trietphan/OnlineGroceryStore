# Warehouses
## Create
`POST /api/warehouses`

### Parameters
| Name       | Type   | Notes    |
|------------|--------|----------|
| `capacity` | Number | Required |

```json
{
  "capacity": 2000
}
```

### Response
If a warehouse was successfully created:

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

`GET /api/warehouses/`

### Response
On success returns a list with ALL warehouses with no corresponding data:

```
Status 200
```

```json
[{
  "id": 1,
  "capacity": 2000
}]
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

`GET /api/warehouses/:id`

### Response
On success returns a single warehouse with selected id:

```
Status 200
```

```json
{
  "id": 1,
  "capacity": 2000,
  "address": {
    "id": 25,
    "streetAddress": "3 Ducks Ave apt 33",
    "city": "Ducktown",
    "state": "SD",
    "zipcode": "54321",
    "warehouse": { "id": 1 }
  }
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
`PUT /api/warehouses/:id`

Warehouse with provided `id` will get updated

### Parameters
| Name       | Type   | Notes                                                                 |
|------------|--------|-----------------------------------------------------------------------|
| `capacity` | Number | Optional                                                              |
| `address`  | Object | Optional, must be an object with `id` property of the desired address |

```json
{
  "capacity": 3000,
  "address": { "id": 26 }
}
```

### Response
If a warehouse was successfully updated:

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

`DELETE /api/warehouses/:id`

### Response
If warehouse with selected `id` was successfully deleted:

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
