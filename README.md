# URL Shortener

A simple and efficient URL shortener service built with Node.js, Express, and MongoDB. It allows users to shorten long URLs and redirect to the original URL.

## Features

*   **URL Shortening:** Create short aliases for long URLs.
*   **Redirection:** Redirect short URLs to their original long counterparts.
*   **User Authentication:** Secure endpoints with JWT-based authentication.
*   **Validation:** Request validation using Joi.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/)
*   [Bun](https://bun.sh/) (or npm/yarn)
*   [MongoDB](https://www.mongodb.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

    Or with npm:

    ```bash
    npm install
    ```

## Usage

1.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ``` shell
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/url-shortener
    BASE_URL=your_backend_domain
    JWT_SECRET=your_jwt_secret
    ```

2.  **Start the server:**

    ```bash
    bun run index.js
    ```

    The server will start on `http://localhost:3000`.

## API Documentation

Detailed API documentation is available via Swagger UI. Once the server is running, you can access it at:

<<<<<<< HEAD
*   `http://localhost:3000/docs`
=======
*   `GET /:shortId` - Redirect to the original URL.

### Private Endpoints
*   `GET /` - Returns all urls for the user(protected auth endpoint).

### Authentication

*   `POST /auth/signup` - Register a new user.
*   `POST /auth/login` - Login an existing user.

### URL Shortening

*   `POST /api/shortener` - Shorten a new URL (Authentication required).
>>>>>>> 0e4e225f1ba46fab15a6906661ca5522409f0063

## Technologies Used

*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web framework for Node.js.
*   **MongoDB:** NoSQL database.
*   **Mongoose:** MongoDB object modeling for Node.js.
*   **JWT:** JSON Web Tokens for authentication.
*   **Bcrypt:** Library for hashing passwords.
*   **Joi:** Object schema validation.
*   **Bun:** JavaScript runtime and bundler.

## Configuration

*   **`config/db.js`:** Contains the database connection logic.
*   **`utils/validationSchemas.js`:** Joi schemas for request validation.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.