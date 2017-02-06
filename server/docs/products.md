# Products
## Create
`POST /api/products`

### Parameters
| Name             | Type   | Notes                        |
|------------------|--------|------------------------------|
| `name`           | String | Required                     |
| `category`       | String | Required                     |
| `productsize`    | Number | Required                     |
| `nutrition`      | String | Optional, only for `food`    |
| `alcoholcontent` | String | Optional, only for `alcohol` |
| `stock`          | Number | Required                     |
| `price`          | Number | Required                     |

```json
{
  "name": "Banana",
  "category": "food",
  "productsize": 9000,
  "nutrition": "Much nutritionness, such goodness",
  "stock": 200,
  "price": 300

}
```

### Response
If a product was successfully created:

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

`GET /api/products`

### Response
On success returns a list with ALL products, with NO corresponding data

```
Status 200
```

```json
[
  {
    "id": 1,
    "name": "Banana",
    "category": "food",
    "productsize": 9001,
    "nutrition": "Great Success",
    "stock": 200,
    "price": 300

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

`GET /api/products/:id`

### Response
On success returns a single product with all corresponding data

```
Status 200
```

```json
{
  "id": 1,
  "name": "Banana",
  "category": "food",
  "productsize": 9001,
  "nutrition": "Great Success",
  "stock": 200,
  "price": 300
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
`PUT /api/products/:id`

Product with provided `id` will get updated

### Parameters
| Name             | Type   | Notes                        |
|------------------|--------|------------------------------|
| `name`           | String | Optional                     |
| `category`       | String | Optional                     |
| `productsize`    | Number | Optional                     |
| `nutrition`      | String | Optional, only for `food`    |
| `alcoholcontent` | String | Optional, only for `alcohol` |
| `stock`          | Number | Optional                     |
| `price`          | Number | Optional                     |

```json
{
  "name": "Banana",
  "category": "food",
  "productsize": 9000,
  "nutrition": "Still pretty good!",
  "stock": 199,
}
```

### Response
If a product was successfully updated:

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

`DELETE /api/products/:id`

### Response
If product with selected `id` was successfully deleted:

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

