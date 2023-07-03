import {pool} from '../db/connection.js'
import {QueryBuilder} from '../db/QueryBuilder.js'
import {User} from './User.js'
import {Post} from './Post.js'

export class Comment {
    constructor(data) {
        this.id = data.id
        this.content = data.content
        this.userId = data.user_id
        this.postId = data.post_id
    }

    /**
     * Fetches the user who wrote the comment.
     * @returns {Promise<User>}
     */
    async getUser() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.select('users', ['*'], {id: this.userId})
        const result = await pool.query(query.text, query.values)
        return new User(result.rows[0])
    }

    /**
     * Fetches the post that the comment is associated with.
     * @returns {Promise<Post>}
     */
    async getPost() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.select('posts', ['*'], {id: this.postId})
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
            user_id: this.userId,
            post_id: this.postId
        })
        const result = await pool.query(query.text, query.values)
        this.id = result.rows[0].id
    }

    /**
     * Updates the current comment instance in the database.
     * @returns {Promise<void>}
     */
    async update() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.update('comments', {
            content: this.content,
            user_id: this.userId,
            post_id: this.postId
        }, {
            id: this.id,
        })
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
        })
        await pool.query(query.text, query.values)
        this.id = null;
        this.content = null;
        this.userId = null;
        this.postId = null;
    }
}
