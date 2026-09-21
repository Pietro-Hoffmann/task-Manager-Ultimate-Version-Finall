# Task Manager — MVC REST API

Task management REST API built on Express in a clean MVC layout, with server-rendered
views and interactive API documentation.

## Structure

```
src/
  controllers/   request handling and validation
  models/        task data and persistence
  routes/        endpoint definitions
  views/         EJS templates
swagger.js       OpenAPI specification
server.js        application entry point
```

## Stack

**Node.js** · **Express** · **EJS** · **Swagger (OpenAPI)**

## Running locally

```bash
npm install
node server.js
```

The API documentation is served by Swagger UI once the app is running.

> Built as a study project in REST API design and MVC separation.
