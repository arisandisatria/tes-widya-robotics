# **API - Widya Robotics Knowledge Test**

By: Arisandi Satria Jeujanan

API Link : -

## Documentation

### 1. **Register User**

- Endpoint: `api/auth/register`
- Method: `POST`
- Auth: NO
- Body:

  ```json
  {
    "fullname": "string",
    "gender": "enum[string]",
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
  }
  ```

  Example:

  ```json
  {
    "fullname": "Aris",
    "gender": "Laki-laki",
    "email": "arisandi@gmail.com",
    "password": "1234",
    "confirmPassword": "1234"
  }
  ```

- Response:
  - Success: `201 Created`

    Example:

    ```json
    {
      "message": "User berhasil dibuat!",
      "data": {
        "fullname": "Aris",
        "email": "arisandi@gmail.com",
        "gender": "Laki-laki",
        "_id": "658d6e8c265259fe030e50e1"
      }
    }
    ```

  - Error: `400 Bad Request` || `409 Conflict` || `500 Internal Server Error`

    Example:

    If there is empty inputs `400 Bad Request`:

    ```json
    {
      "success": false,
      "statusCode": 400,
      "message": "Tolong isi semua input!"
    }
    ```

    If email is invalid `400 Bad Request`:

    ```json
    {
      "success": false,
      "statusCode": 400,
      "message": "Email invalid!"
    }
    ```

    If email has already registered `409 Conflict`:

    ```json
    {
      "success": false,
      "statusCode": 409,
      "message": "Email sudah terdaftar!"
    }
    ```

    If the server get an error `500 Internal Server Error`:

    ```json
    {
      "success": false,
      "statusCode": 500,
      "message": "Internal server error!"
    }
    ```

### 2. **Login User**

- Endpoint: `api/auth/login`
- Method: `POST`
- Auth: NO
- Body:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

  Example:

  ```json
  {
    "email": "arisandi@gmail.com",
    "password": "1234"
  }
  ```

- Response:
  - Success: `200 OK`

    Example:

    ```json
    {
      "_id": "6ae47c5a7b9cb1833d8ed97f",
      "fullname": "Aris",
      "email": "arisandi@gmail.com",
      "gender": "Laki-laki",
      "createdAt": "2026-10-30T11:15:38.940Z",
      "updatedAt": "2026-10-30T11:15:38.940Z",
      "__v": 0,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZTQ3YzVhN2I5Y2IxODMzZDhlZDk3ZiIsImlhdCI6MTc5MzQ2MTI0NSwiZXhwIjoxNzkzNTQ3NjQ1fQ.Mad4e0PowYTxsulLzw3zTXb_aLNwwEjync3ItQepUEU"
    }
    ```

    **Note:** _Get the token from cookies named "access_token"_

  - Error: `400 Bad Request` || `401 Unauthorized` || `404 Not Found` || `500 Internal Server Error`

    Example:

    If there is an input is empty `400 Bad Request`:

    ```json
    {
      "success": false,
      "statusCode": 400,
      "message": "Tolong isi semua input!"
    }
    ```

    If email is invalid `400 Bad Request`:

    ```json
    {
      "success": false,
      "statusCode": 400,
      "message": "Email invalid!"
    }
    ```

    If password is wrong `401 Unauthorized`:

    ```json
    {
      "success": false,
      "statusCode": 401,
      "message": "Password salah!"
    }
    ```

    If account is unregistered `404 Not Found`:

    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "User tidak ditemukan!"
    }
    ```

    If the server get an error `500 Internal Server Error`:

    ```json
    {
      "success": false,
      "statusCode": 500,
      "message": "Internal Server Error"
    }
    ```

### 3. **Logout User**

- Endpoint: `api/auth/logout`
- Method: `GET`
- Auth: NO
- Body: -
- Response:
  - Success: `200 OK`

    Example:

    ```json
    {
      "message": "User sudah logout!"
    }
    ```

  - Error:`500 Internal Server Error`

    Example:

    If the server get an error `500 Internal Server Error`:

    ```json
    {
      "success": false,
      "statusCode": 500,
      "message": "Internal Server Error"
    }
    ```

### 4. **Get User Profile**

- Endpoint: `api/user/profile`
- Method: `GET`
- Auth: YES
- Body: -
- Response:
  - Success: `200 OK`

    Example:

    ```json
    {
      "success": true,
      "data": {
        "_id": "6ae47c5a7b9cb1833d8ed97f",
        "fullname": "Aris",
        "email": "arisandi@gmail.com",
        "gender": "Laki-laki",
        "createdAt": "2026-10-30T11:15:38.940Z",
        "updatedAt": "2026-10-30T11:15:38.940Z",
        "__v": 0
      }
    }
    ```

  - Error: `404 Not Found` || `500 Internal Server Error`

    Example:

    If account is unregistered `404 Not Found`:

    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "User tidak ditemukan!"
    }
    ```

    If the server get an error `500 Internal Server Error`:

    ```json
    {
      "success": false,
      "statusCode": 500,
      "message": "Internal Server Error"
    }
    ```
