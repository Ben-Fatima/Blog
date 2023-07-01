import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Pool is a class of 'pg' module which allows
 * us to create a pool of connections to the PostgreSQL database.
 * The 'Pool' object will keep the connection alive for further queries.
 */
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

/**
 * Error listener that logs any error related to idle client in the pool.
 * In case of an error, it forces the application to crash.
 */
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

