# Orders
## Create
`POST /api/orders`

### Parameters
| Name         | Type         | Notes                                                   |
|--------------|--------------|---------------------------------------------------------|
| `status`     | Number       | Required, { 0: initialized, 1: completed, 2: canceled'} |
| `quantities` | List[Number] | Required                                                |
| `products`   | List[Object] | Required, object with `id`                              |
| `customer`   | Object       | Required, object with `id`                              |

```json
{
  "status": 0,
  "quantities": [1, 3]
  "products": [{ "id": 23 }, { "id": 25 }],
  "customer": { "id": 2 }
}
```

### Response
If an order was successfully created:

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

## GetId
`GET /api/orders/:id`

### Response
On success returns a list with ALL of the orders, with ALL of the corresponding data for a CUSTOMER with specified `id`:

```
Status 200
```

```json
[
  {
    "id": 300,
    "quantities": [1],
    "products": [{
      "id": 300,
      "name": "Banana",
    }],
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

## Update
`PUT /api/orders/:id`

ORDER with given `id` will get updated

### Parameters
| Name         | Type         | Notes                                                    |
|--------------|--------------|----------------------------------------------------------|
| `status`     | Number       | Optional, { 0: initialized, 1: completed, 2: cancelled'} |
| `quantities` | List[Number] | Optional                                                 |
| `products`   | List[Object] | Optional, object with `id`                               |

```json
{
  "status": 1,
  "quantities": [5, 3]
  "products": [{ "id": 23 }, { "id": 25 }],
}
```

### Response
If price was successfully updated:

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

`DELETE /api/orders/:id`

### Response
If an order with a selected `id` was successfully deleted:

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
