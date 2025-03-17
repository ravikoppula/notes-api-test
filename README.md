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

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
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
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    JWT_EXPIRES_IN=90d
    PORT=3000
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

## Deployment

You can deploy the application on a hosting platform of your choice. For example, you can use Render for free hosting for small apps.

### Deploy on Render

1. Create a new web service on Render.
2. Connect your GitHub repository.
3. Set the build and start commands:
    - Build Command: `npm install`
    - Start Command: `npm start`
4. Add the environment variables from your `.env` file in the Render dashboard.
5. Deploy the service.

## API Documentation

The API documentation is available via Swagger. You can access it at `/api-docs` endpoint once the server is running.

### Swagger Page

If applicable, please provide the link to your Swagger page.

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
    }
  ]
}
```
