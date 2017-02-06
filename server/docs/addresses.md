# Addresses

## Create
`POST /api/addresses`

### Parameters
| Name            | Type   | Notes                                                               |
|-----------------|--------|---------------------------------------------------------------------|
| `streetaddress` | String | Required                                                            |
| `city`          | String | Required                                                            |
| `state`         | String | Required                                                            |
| `zipcode`       | String | Required                                                            |
| `customer`      | Object | this or `staff`, is required. Object with `id` field is required    |
| `staff`         | Object | this or `customer`, is required. Object with `id` field is required |

```json
{
  "streetaddress": "123 Goose Ave apt 10",
  "city": "Ducktown",
  "state": "North Duckota",
  "zipcode": "12345",
  "customer": { "id": 1 }
}
```

### Response
If an address was successfully created:

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

## Update
`PUT /api/addresses/:id`

### Parameters
| Name            | Type   | Notes    |
|-----------------|--------|----------|
| `streetaddress` | String | Optional |
| `city`          | String | Optional |
| `state`         | String | Optional |
| `zipcode`       | String | Optional |


```json
{
  "streetaddress": "123 Duck Ave apt 10",
  "city": "Goosetown",
  "state": "Gooseconsin",
  "zipcode": "12345"
}
```

### Response
If an address was successfully updated:

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

`DELETE /api/addresses/:id`

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
