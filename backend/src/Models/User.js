import {pool} from '../db/connection.js'
import {QueryBuilder} from '../db/QueryBuilder.js'
import {Post} from './Post.js'

export class User {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.email = data.email
        this.bio = data.bio
    }

    /**
     * Fetches all users from the database.
     * @returns {Promise<Array<User>>}
     */
    static async getUsers() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.select('users')
        const result = await pool.query(query.text, query.values)
        return result.rows.map(row => new User(row))
    }

    /**
     * Fetches a single user from the database by their id.
     * @param {number} id - The id of the user.
     * @returns {Promise<User>}
     */
    static async getUserById(id) {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.select('users', ['*'], {id})
        const result = await pool.query(query.text, query.values)
        return new User(result.rows[0])
    }

    /**
     * Inserts the current user instance into the database.
     * @returns {Promise<void>}
     */
    async addUser() {
        const queryBuilder = new QueryBuilder();
        const query = queryBuilder.insert('users', {
            name: this.name,
            email: this.email,
            bio: this.bio
        })
        await pool.query(query.text, query.values)
    }

    /**
     * Updates the current user instance in the database.
     * @returns {Promise<void>}
     */
    async update() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.update('users', {
            name: this.name,
            email: this.email,
            bio: this.bio
        }, {
            id: this.id,
        })
        await pool.query(query.text, query.values)
    }

    /**
     * Deletes the current user instance in the database.
     * @returns {Promise<void>}
     */
    async delete() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.delete('users', {
            id: this.id,
        });
        await pool.query(query.text, query.values)
    }

    /**
     * Fetches all posts for the current user from the database.
     * @returns {Promise<Array<Post>>}
     */
    async getAllPosts() {
        const queryBuilder = new QueryBuilder();
        const query = queryBuilder.select('posts', ['*'], { user_id: this.id });
        const result = await pool.query(query.text, query.values);
        return result.rows.map(row => new Post(row));
    }

    /**
     * Fetches a single post for the current user from the database by its id.
     * @param {number} postId - The id of the post.
     * @returns {Promise<Post>}
     * @throws Error
     */
    async getPostById(postId) {
        const queryBuilder = new QueryBuilder();
        const query = queryBuilder.select('posts', ['*'], { id: postId, user_id: this.id });
        const result = await pool.query(query.text, query.values);
        if(result.rows.length > 0){
            return new Post(result.rows[0]);
        } else {
            throw new Error('Post not found or does not belong to this user');
        }
    }
}
