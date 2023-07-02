# Blog Platform

## Overview

Welcome to my Blog Platform Project. 
This is a hands-on project aimed at mastering web development with Node.js. 
By designing and building a full-featured blog platform, I delve into numerous aspects of web development, including backend development, database management, and server-client interaction.
The Blog Platform is a comprehensive application where users can create, read, update, and delete blog posts. It also supports comments, categories, and user management, offering a full suite of features found in real-world blogging platforms.
The emphasis, however, is on learning. The primary objective of this project is to understand and implement various web development concepts in a practical context. To make this learning experience robust and holistic, I've built a custom Object-Relational Mapping (ORM) system as a part of this project.

## ORM design

The ORM system is an integral part of the Blog Platform. It serves as an interface between our Node.js code and the PostgreSQL database, providing a seamless and efficient way of interacting with the database.

## Primary Components

The ORM consists of four primary components:

1. Database Connection Manager
2. Query Builder
3. Entity Classes
4. Relationship Manager

### 1. Database Connection Manager

The Database Connection Manager is responsible for maintaining the connection with the PostgreSQL database. It utilizes a `Pool` object from the `pg` (node-postgres) library. 
This object allows us to establish a pool of connections to the PostgreSQL database, reusing them as needed, improving the performance of our application.

The connection details, including user, host, database, password, and port, are stored in environment variables for security.

An error listener is attached to the pool object to log any error related to idle client in the pool.

Example:

```javascript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});
```

### 2. Query Builder

The Query Builder generates SQL queries for Create, Read, Update, and Delete (CRUD) operations. It abstracts the SQL syntax and provides a more intuitive interface for interacting with the database.

Example of how to use it:

```javascript
import { QueryBuilder } from '../db/QueryBuilder.js';

const queryBuilder = new QueryBuilder();
const query = queryBuilder.select('users', ['*'], {id: 1});
console.log(query);  // Outputs: { text: 'SELECT * FROM users WHERE id = $1', values: [1] }

```

### 3.Entity Classes

The Entity Classes map to the tables in our database. They include User, Post, Comment, and Category. Each class has properties that correspond to the columns in the respective table. They also contain methods for performing CRUD operations on the table.

Example of how to use them:

```javascript
import { User } from './User.js';

// Create and insert a new user
const user = new User({ username: 'newUser', password: 'password123' });
await user.addUser();

// Fetch a user
const fetchedUser = await User.getUserByUsername('newUser');

```

### 4.Relationship Manager

Relationship management is handled by methods within the Entity Classes that fetch related data based on foreign key relationships. The methods like getPostById, getUser, getCategory, etc., manage these relationships by querying associated data based on foreign key constraints.

Example:

```javascript
import { Post } from './Post.js';

// Fetch a post and its associated user
const post = await Post.getPostById(1);
const user = await post.getUser();

```

## API Design

The API provides a simple and intuitive interface for interacting with the database. It abstracts away the SQL from the user and allows CRUD operations by creating instances of Entity Classes and calling their methods.

Example:
```javascript
import { User } from './User.js';
import { Post } from './Post.js';

// Create a new user
const user = new User({ username: 'newUser', password: 'password123' });
await user.addUser();

// Create a new post associated with the user
const post = new Post({ title: 'New Post', content: 'This is a new post.', userId: user.id });
await post.addPost();
```

