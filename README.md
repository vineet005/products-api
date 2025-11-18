# Products API (Express.js, Sequelize, SQLite/MSSQL)

A robust and simple RESTful API for managing product inventory, built using **Node.js**, **Express.js**, and **Sequelize**. The project features comprehensive input validation, advanced error handling (using appropriate HTTP status codes), and integrated **Swagger UI** documentation for easy testing and consumption.

## Features

* **Full CRUD Operations:** Create, List, Retrieve, Update, and Delete products.
* **Validation Middleware:** Strong input validation for all required fields, ensuring non-negative prices and stock, performed *before* hitting the database.
* **Sequelize ORM:** Database interaction using Sequelize, configured for in-memory SQLite (easily switchable to MSSQL via configuration).
* **Swagger Documentation:** Interactive API documentation available at the `/api-docs` endpoint.
* **HTTP Status Codes:** Proper response codes (`200`, `201`, `400`, `404`, `409`, `500`) are used for clarity and professionalism.

---

## Tech Stack

* **Framework:** Node.js, Express.js
* **Database ORM:** Sequelize
* **Database:** SQLite (Default, In-Memory) / MSSQL (Configured via `.env`)
* **Documentation:** Swagger UI Express

---

## Getting Started

### Prerequisites

You need **Node.js** (which includes npm) and **Git** installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/vineet005/products-api.git](https://github.com/vineet005/products-api.git)
    cd products-api
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a file named **`.env`** in the root directory and add the following:
    ```
    PORT=3000

    # MSSQL CONFIG (Uncomment and set if switching from SQLite)
    # MSSQL_HOST=localhost
    # MSSQL_USER=your_user
    # MSSQL_PASSWORD=your_password
    # MSSQL_DB=ProductsDB
    ```

### Running the API

Start the server using the `start` script:

```bash
npm start

---

Database Configuration

The application is configured in `config/database.js`.

### Default (SQLite)

The default setup uses **Sequelize with the in-memory SQLite dialect**. Data will **not persist** between server restarts.

### MSSQL Setup

To switch to MSSQL, you must:
1.  Install the MSSQL driver: `npm install tedious`.
2.  Uncomment and configure the MSSQL connection block in **`config/database.js`**.
3.  Provide the necessary credentials in your **`.env`** file.

## Data Model (`Product`)

The `Product` schema defines the fields and crucial business logic constraints enforced by Sequelize.

| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | Primary key | Auto-increment |
| `name` | `STRING` | Name of the product | **Required, Unique** |
| `price` | `FLOAT` | Price of the product | **Required, Non-Negative (>= 0)** |
| `stock` | `INTEGER` | Current stock count | **Required, Non-Negative Integer (>= 0)** |

---

## API Documentation and Testing

The API documentation is fully interactive using **Swagger UI**.

* **Access Docs:** Navigate to `http://localhost:3000/api-docs` in your browser.

### Endpoints

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `POST` | `/products` | **Add** a new product. | `201` (Created), `400` (Validation), `409` (Conflict) |
| `GET` | `/products` | **List** all products. | `200` (OK) |
| `GET` | `/products/:id` | **Retrieve** a product by ID. | `200` (OK), `404` (Not Found) |
| `PATCH`| `/products/:id` | **Update** product details (partial update). | `200` (OK), `400` (Validation), `404` (Not Found), `409` (Conflict) |
| `DELETE`| `/products/:id` | **Delete** a product by ID. | `204` (No Content), `404` (Not Found) |
