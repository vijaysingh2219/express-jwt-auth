# Express.js Authentication with JWT and Cookies

This is a simple Express.js application that demonstrates user authentication using JSON Web Tokens (JWT) and cookies. The application includes features such as user registration, login, token refresh, and logout.

## Features

- **User Registration:** Allow users to create a new account by providing a unique username and password.

- **User Login:** Authenticate users based on their credentials (username and password) and issue JWT for access.

- **Token Refresh:** Provide an endpoint to refresh the JWT by exchanging a valid refresh token.

- **User Logout:** Implement a secure logout mechanism to invalidate the refresh token.

- **Authenticated Route:** Create a protected route that requires a valid JWT for access.

## Project Structure

The project is organized into the following key directories:

- **`src/config:`** Contains configuration files, such as CORS settings.

- **`src/controllers:`** Contains controller functions for handling various routes (login, logout, registration, etc.).

- **`src/middlewares:`** Includes custom middleware functions, such as JWT verification.

- **`src/models:`** Defines MongoDB models for user data.

- **`src/routes:`** Defines Express.js routes for different features.

- **`src/index.ts:`** The main entry point of the application.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) set up and running locally or remotely.

## Installation

1. Clone the repository using web URL, SSH or the official GitHub CLI.

2. Navigate to the project directory:

   ```bash
   cd express-jwt-auth
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your environment variables by creating a `.env` file (you can use `.env.example` as a template).

5. Start the application:

   ```bash
   npm start
   ```

## Usage

- Access the API documentation at [api-docs](/docs/documentation.md) after starting the application.

- Test the various features using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or feature requests, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
