#  User Auth API

A robust and efficient web application designed for user authentication, leveraging the power of NestJS and MongoDB for a seamless and secure user experience.

## 🚀 Features

- **Authentication Module**: Provides endpoints for `Register` and `Login`.


## 🛠️ Technologies

- **NestJS**: Powers the web framework.
- **MongoDB**: Functions as the central database.


## 🚀 Deployment Details
- **Web Application**: Deployed on an AWS EC2 instance, accessible at [server](https://www.mtauth.online/api).


## 📬 Endpoints

- **POST /auth/register**
  - **Overview**: Registers a new user account with the provided credentials.
  - **Request Body**:
    - **Description**: Submit the user's email, name, and password to create a new account.
    - **Example Request**:
      ```json
      {
        "email": "user@example.com",
        "name": "Jane Smith",
        "password": "your_password_here"
      }
      ```
  - **Response**:
    - **Status Code**: 201 Created
    - **Description**: Returns a JWT token for authentication and the details of the newly created user.
    - **Example Response**:
      ```json
      {
        "token": "your_jwt_token_here",
        "user": {
          "email": "user@example.com",
          "name": "Jane Smith",
          "createdAt": "2024-06-30T12:34:56.789Z",
          "updatedAt": "2024-06-30T12:34:56.789Z",
          "id": "abc123xyz4567890"
        }
      }
      ```


- **POST /auth/login**
  - **Overview**: Authenticates a user and provides a JWT token for subsequent requests.
  - **Request Body**:
    - **Description**: Send the user's email and password to log in and receive an authentication token.
    - **Example Request**:
      ```json
      {
        "email": "user@example.com",
        "password": "your_password_here"
      }
      ```
  - **Response**:
    - **Status Code**: 200 OK
    - **Description**: Returns a JWT token for authenticated sessions and the user's profile information.
    - **Example Response**:
      ```json
      {
        "token": "your_jwt_token_here",
        "user": {
          "email": "user@example.com",
          "name": "Jane Smith",
          "createdAt": "2024-06-30T12:34:56.789Z",
          "updatedAt": "2024-06-30T12:34:56.789Z",
          "id": "def456uvw7890123"
        }
      }
      ```

## 🛠️ Local Development

1. Clone the repository.
2. Ensure `npm` or `yarn` are installed on your machine.
3. install the NestJS cli via 
      ```bash
   npm install -g @nestjs/cli
4. run this command in the root directory.
      ```bash
   npm install
   ```

The application should now be running in development mode and accessible at [http://localhost:3000](http://localhost:3000).


## Authors

- [@MhmodTayel](https://github.com/MhmodTayel)

