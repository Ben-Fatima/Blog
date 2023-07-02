import {pool} from '../db/connection.js'
import {QueryBuilder} from '../db/QueryBuilder.js'
import {User} from './User.js'
import {Category} from './Category.js'

export class Post {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.body = data.body
        this.userId = data.user_id
        this.categoryId = data.categoryId
    }

    /**
     * Inserts the current post instance into the database.
     * @returns {Promise<void>}
     */
    async addPost() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.insert('posts', {
            title: this.title,
            body: this.body,
            user_id: this.userId
        })
        await pool.query(query.text, query.values)
    }

    /**
     * Updates the current post instance in the database.
     * @returns {Promise<void>}
     */
    async update() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.update('posts', {
            title: this.title,
            body: this.body
        }, {
            id: this.id
        })
        await pool.query(query.text, query.values)
    }

    /**
     * Deletes the current post instance in the database.
     * @returns {Promise<void>}
     */
    async delete() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.delete('posts', {
            id: this.id
        })
        await pool.query(query.text, query.values)
    }

    /**
     * Fetches the user associated with the current post.
     * @returns {Promise<User>}
     */
    async getUser() {
        return await User.getUserById(this.userId)
    }

    /**
     * Fetches the category of the post from the database.
     * @returns {Promise<Category>}
     */
    async getCategory() {
        return await Category.getCategoryById(this.categoryId)
    }
}