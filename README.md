# Notes API

## Overview

Notes API is a secure and scalable RESTful API for managing notes. It allows users to create, read, update, delete, and share notes. The API is built using Node.js, Express, and MongoDB.

## Choice of Framework/DB/3rd Party Tools

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, chosen for its performance and scalability.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A NoSQL database chosen for its flexibility and scalability in handling unstructured data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model application data.
- **JWT (jsonwebtoken)**: Used for secure authentication and authorization.
- **bcryptjs**: Used for hashing passwords.
- **Helmet**: Helps secure Express apps by setting various HTTP headers.
- **express-mongo-sanitize**: Prevents MongoDB Operator Injection.
- **xss-clean**: Sanitizes user input to prevent XSS attacks.
- **express-rate-limit**: Limits repeated requests to public APIs and/or endpoints.
- **winston**: A versatile logging library.
- **Swagger**: Used for API documentation.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- OpenSSL (for generating self-signed certificates)

### Installation

1. Clone the repository:
    ```sh
    git clone <https://github.com/ravikoppula/notes-api-test.git>
    cd notes-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGO_TEST_URI=mongodb://localhost:27017/TestingDB
    TEST_USERNAME='testuser'
    TEST_EMAIL='testuser@gmail.com'
    TEST_PASSWORD='123'
    MONGO_URI=mongodb+srv://ravikoppulaca:HaQRGqVBmHNSrluw@notes-api-cluster.gkqb5.mongodb.net/UserNotes?retryWrites=true&w=majority
    JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDQ0NmY4NTk1YTgwNzljMDk0N2UwOSIsImlhdCI6MTc0MTk2NzQwNiwiZXhwIjoxNzQ5NzQzNDA2fQ.QG3uHl6axr2kP5_wRJ7yWsJaQiXDzZ8nQFBmEbXEi4I
    JWT_EXPIRES_IN=90d
    PORT=3000
    HTTPS_PORT=3443
    ```
 
### Running the Application

1. Start the server:
    ```sh
    npm start
    ```

2. For development mode with hot-reloading:
    ```sh
    npm run dev
    ```

### Running Tests

1. Run the tests:
    ```sh
    npm test
    ```

## On Render use the cloude link to access  

`https://notes-api-test-t902.onrender.com/api-docs/`

## API Documentation

The API documentation is available via Swagger. You can access it at `/api-docs` endpoint once the server is running.

### Swagger Page

`http://localhost:3000/api-docs/` 
(or) 
`https://localhost:3443/api-docs/`

## Postman Collection

You can import the following Postman collection to test the APIs:

```json
{
  "info": {
    "name": "Notes API",
    "description": "Postman collection for Notes API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Signup",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"username\": \"testuser\",\n    \"email\": \"testuser@gmail.com\",\n    \"password\": \"123\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/api/auth/signup",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "auth",
            "signup"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"username\": \"testuser\",\n    \"password\": \"123\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/api/auth/login",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "auth",
            "login"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Get Notes",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-token>",
            "type": "text"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/api/notes",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "notes"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Get Note By ID",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-token>",
            "type": "text"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/api/notes/{id}",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "notes",
            "{id}"
          ],
          "variable": [
            {
              "key": "id",
              "value": "<note-id>"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "Update Note",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-token>",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"title\": \"Updated Note\",\n    \"content\": \"This is an updated test note\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/api/notes/{id}",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "notes",
            "{id}"
          ],
          "variable": [
            {
              "key": "id",
              "value": "<note-id>"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "Delete Note",
      "request": {
        "method": "DELETE",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-token>",
            "type": "text"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/api/notes/{id}",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "notes",
            "{id}"
          ],
          "variable": [
            {
              "key": "id",
              "value": "<note-id>"
            }
          ]
        }
      },
      "response": []
    },
    {
      "name": "Search Notes",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-token>",
            "type": "text"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/api/notes/search/{userId}?q={query}",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "notes",
            "search",
            "{userId}"
          ],
          "query": [
            {
              "key": "q",
              "value": "<search-query>"
            }
          ],
          "variable": [
            {
              "key": "userId",
              "value": "<user-id>"
            }
          ]
        }
      },
      "response": []
    }
  ]
}
