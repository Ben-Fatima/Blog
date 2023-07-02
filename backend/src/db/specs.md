# Custom ORM for the Blog Platform

## Overview

The aim of this project is to design and implement a custom Object-Relational Mapping (ORM) tool to be used within a blog platform using a PostgreSQL database.
This ORM will provide an abstraction for the underlying database, allowing for simple, intuitive interactions through JavaScript objects instead of raw SQL queries.

## Scope

This custom ORM will be specifically designed to interact with a PostgreSQL database and manage the underlying data structures required for a blog platform.
The primary data structures/entities to be managed include:

- `Users`
- `Posts`
- `Comments`
- `Categories`

## Objectives

The primary objectives of this project include:

- **SQL Abstraction**: Enable the development team to perform database operations using JavaScript objects, abstracting away the need to write raw SQL queries.
- **Connection Management**: Implement a robust database connection module to handle connections, disconnections, and errors efficiently.
- **Entity Mapping**: Define classes that map to the database tables. These classes will contain properties corresponding to table columns.
- **CRUD Operations**: Implement methods for performing CRUD (Create, Read, Update, Delete) operations on each of the defined entity classes.
- **Relationships**: Provide support for relationships between tables (one-to-one, one-to-many, and many-to-many).
- **Security**: Ensure protection against SQL injection attacks and other common security vulnerabilities.
- **Error Handling**: Implement robust error handling mechanisms to ensure system stability and ease of debugging.

Secondary objectives include:

- **Transactions**: Implement support for database transactions to ensure data integrity.
- **Advanced Queries**: Allow for complex querying capabilities such as sorting, filtering, and aggregation.

## Out of Scope

While broad compatibility and feature richness are valuable goals, the following are considered out of scope for this project:

- **Non-PostgreSQL Compatibility**: While I may wish to expand compatibility in the future, this project's initial focus will be solely on PostgreSQL.
- **Front-End Development**: This project will focus on backend development. Any front-end or user interface aspects of the blog platform are beyond the scope of this project.

With a keen focus on these objectives, I aim to develop a robust, secure, and user-friendly ORM, facilitating the development process of the blog platform, enabling efficient data management, and ensuring database interaction security.
