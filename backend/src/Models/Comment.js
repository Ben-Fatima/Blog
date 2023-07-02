import {pool} from '../db/connection.js'
import {QueryBuilder} from '../db/QueryBuilder.js'
import {User} from './User.js'
import {Post} from './Post.js'

export class Comment {
    constructor(data) {
        this.id = data.id
        this.content = data.content
        this.user_id = data.user_id
        this.post_id = data.post_id
    }

    /**
     * Fetches the user who wrote the comment.
     * @returns {Promise<User>}
     */
    async getUser() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.select('users', ['*'], {id: this.user_id})
        const result = await pool.query(query.text, query.values)
        return new User(result.rows[0])
    }

    /**
     * Fetches the post that the comment is associated with.
     * @returns {Promise<Post>}
     */
    async getPost() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.select('posts', ['*'], {id: this.post_id})
        const result = await pool.query(query.text, query.values)
        return new Post(result.rows[0])
    }

    /**
     * Inserts the current comment instance into the database.
     * @returns {Promise<void>}
     */
    async addComment() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.insert('comments', {
            content: this.content,
            user_id: this.user_id,
            post_id: this.post_id
        })
        await pool.query(query.text, query.values)
    }

    /**
     * Updates the current comment instance in the database.
     * @returns {Promise<void>}
     */
    async update() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.update('comments', {
            content: this.content,
            user_id: this.user_id,
            post_id: this.post_id
        }, {
            id: this.id,
        });
        await pool.query(query.text, query.values)
    }

    /**
     * Deletes the current comment instance in the database.
     * @returns {Promise<void>}
     */
    async delete() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.delete('comments', {
            id: this.id,
        });
        await pool.query(query.text, query.values)
    }
}
