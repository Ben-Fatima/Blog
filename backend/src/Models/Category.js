import {pool} from '../db/connection.js'
import {QueryBuilder} from '../db/QueryBuilder.js'

export class Category {
    constructor(data) {
        this.id = data.id
        this.name = data.name
    }

    /**
     * Fetches all categories from the database.
     * @returns {Promise<Category[]>}
     */
    static async getCategories() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.select('categories')
        try {
            const result = await pool.query(query.text, query.values)
            return result.rows.map(row => new Category(row))
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    /**
     * Fetches a single category from the database by their id.
     * @param {number} id - The id of the category.
     * @returns {Promise<Category>}
     */
    static async getCategoryById(id) {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.select('categories', ['*'], {id})
        try {
            const result = await pool.query(query.text, query.values)
            return new Category(result.rows[0])
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    /**
     * Inserts the current category instance into the database.
     * @returns {Promise<Category>} The new category.
     */
    async addCategory() {
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Invalid name for category.')
        }
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.insert('categories', {
            name: this.name,
        })
        try {
            const result = await pool.query(query.text, query.values)
            this.id = result.rows[0].id
            return this
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    /**
     * Updates the current category instance in the database.
     * @returns {Promise<boolean>} Whether the update was successful.
     */
    async update() {
        if (!this.name || typeof this.name !== 'string') {
            throw new Error('Invalid name for category.')
        }
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.update('categories', {
            name: this.name,
        }, {
            id: this.id,
        })
        try {
            const result = await pool.query(query.text, query.values)
            return result.rowCount > 0
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    /**
     * Deletes the current category instance in the database.
     * @returns {Promise<boolean>} Whether the deletion was successful.
     */
    async delete() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.delete('categories', {
            id: this.id,
        })
        try {
            const result = await pool.query(query.text, query.values)
            return result.rowCount > 0
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}