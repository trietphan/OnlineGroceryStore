# Customers

## Create
`POST /api/users/customers`

### Parameters
| Name   | Type   | Notes    |
|--------|--------|----------|
| `name` | String | Required |

```json
{
  "name": "John Doe"
}
```

### Response
If customer was successfully created:

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

`GET /api/users/customers`

### Response
On success returns a list with ALL customers, with NO corresponding data:

```
Status 200
```

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "balance": 0
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

`GET /api/users/customers/:id`

### Response
On success returns a single customer with all of the corresponding data (addresses and credit cards):

```
Status 200
```

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "balance": 0,
    "addresses": [{
      "id": 5,
      "streetaddress": "123 South Boulevard",
      "state": "OH",
      "city": "London",
      "zip": "43140"
    }],
    "creditcards": [{
      "id": 25,
      "number": "1234123412341234",
      "expiration": "05/05",
      "address": {
        "id": 5,
        "streetaddress": "123 South Boulevard",
        "state": "OH",
        "city": "London",
        "zip": "43140"
      }
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
`PUT /api/users/customers/:id`

Customer with provided `id` will get updated

### Parameters
| Name          | Type         | Notes    |
|---------------|--------------|----------|
| `name`        | String       | Optional |

```json
{
  "name": "James Doe"
}
```

### Response
If customer was successfully updated:

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

`DELETE /api/users/customers/:id`

### Response
If customer with selected `id` was successfully deleted:

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
