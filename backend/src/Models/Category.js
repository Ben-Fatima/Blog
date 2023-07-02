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
        const result = await pool.query(query.text, query.values)
        return result.rows.map(row => new Category(row))
    }

    /**
     * Fetches a single category from the database by their id.
     * @param {number} id - The id of the category.
     * @returns {Promise<Category>}
     */
    static async getCategoryById(id) {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.select('categories', ['*'], {id})
        const result = await pool.query(query.text, query.values)
        return new Category(result.rows[0])
    }

    /**
     * Inserts the current category instance into the database.
     * @returns {Promise<void>}
     */
    async addCategory() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.insert('categories', {
            name: this.name,
        })
        await pool.query(query.text, query.values)
    }

    /**
     * Updates the current category instance in the database.
     * @returns {Promise<void>}
     */
    async update() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.update('categories', {
            name: this.name,
        }, {
            id: this.id,
        })
        await pool.query(query.text, query.values)
    }

    /**
     * Deletes the current category instance in the database.
     * @returns {Promise<void>}
     */
    async delete() {
        const queryBuilder = new QueryBuilder()
        const query = queryBuilder.delete('categories', {
            id: this.id,
        })
        await pool.query(query.text, query.values)
    }

}