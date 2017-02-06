# Credit Cards
## Create
`POST /api/creditcards`

### Parameters
| Name         | Type   | Notes                                        |
|--------------|--------|----------------------------------------------|
| `cardnumber` | String | Required                                     |
| `expiration` | String | Required                                     |
| `customer`   | Object | Required, Object with `id` field is required |
| `address`    | Object | Required, Object with `id` field is required |

```json
{
  "cardnumber": "1234123412341234",
  "expiration": "01/05",
  "customer": { "id": 1 },
  "address": { "id": 1 }
}
```

### Response
If  was successfully created:

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
`PUT /api/creditcards/:id`

### Parameters
| Name         | Type   | Notes    |
|--------------|--------|----------|
| `cardnumber` | String | Optional |
| `expiration` | String | Optional |

```json
{
  "cardnumber": "4321432143214321",
  "expiration": "01/10"
}
```

### Response
If a credit card member was successfully updated:

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

`DELETE /api/creditcards/:id`

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

