## Products API
This is a NestJS-based API for managing products, including creating, updating, retrieving, and deleting products. The project uses a simple in-memory storage mechanism with a Map to store product data.

## Features
Create new products with attributes like name, description, price, and category.
Retrieve all products with pagination support.
Retrieve a single product by ID.
Update existing products.
Delete products by ID.
Search products by name or description.


## Installation
Clone the repository:

git clone <repository-url>


## Navigate to the project directory:

cd products-api

## Install dependencies:
npm install

## Running the Application

<!-- Start the application in development mode: -->
npm start run 
    or
npm run start:dev

The API will be running on http://localhost:3000.


## API Endpoints

<!-- Create a Product: -->

POST /products
Request Body: { "name": "Product Name", "description": "Description", "price": 100, "category": "Category" }

<!-- Retrieve All Products: -->

GET /products?page=1&limit=10

<!-- Retrieve a Product by ID: -->

GET /products/:id

<!-- Update a Product: -->

PUT /products/:id
Request Body: { "name": "Updated Name", "description": "Updated Description" }

<!-- Delete a Product: -->

DELETE /products/:id

<!-- Search Products: -->

GET /products/search?q=query


## Technologies Used
NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

TypeScript: A strongly typed programming language that builds on JavaScript.

In-memory storage: Using JavaScript's Map to store product data for simplicity.

## Running Tests

<!-- To run unit tests: -->

npm run test

<!-- To run end-to-end tests: -->

npm run test:e2e