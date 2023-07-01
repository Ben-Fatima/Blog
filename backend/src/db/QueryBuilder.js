class QueryBuilder {
    /**
     * Constructs a SELECT query.
     *
     * @param {string} tableName - The name of the table to select from.
     * @param {string[]} columns - The columns to select.
     * @returns {string} The constructed SQL query.
     */
    select(tableName, columns = ['*']) {
        const columnsString = columns.join(', ');
        return `SELECT ${columnsString} FROM ${tableName}`;
    }

    /**
     * Constructs an INSERT query.
     *
     * @param {string} tableName - The name of the table to insert into.
     * @param {Object} data - The data to insert.
     * @returns {string} The constructed SQL query.
     */
    insert(tableName, data) {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data).join(', ');
        return `INSERT INTO ${tableName} (${keys}) VALUES (${values})`;
    }

    /**
     * Constructs an UPDATE query.
     *
     * @param {string} tableName - The name of the table to update.
     * @param {Object} data - The data to update.
     * @param {Object} conditions - The conditions to determine which rows to update.
     * @returns {string} The constructed SQL query.
     */
    update(tableName, data, conditions) {
        const setString = Object.keys(data).map(key => `${key} = ${data[key]}`).join(', ');
        const conditionString = Object.keys(conditions).map(key => `${key} = ${conditions[key]}`).join(' AND ');
        return `UPDATE ${tableName} SET ${setString} WHERE ${conditionString}`;
    }

    /**
     * Constructs a DELETE query.
     *
     * @param {string} tableName - The name of the table to delete from.
     * @param {Object} conditions - The conditions to determine which rows to delete.
     * @returns {string} The constructed SQL query.
     */
    delete(tableName, conditions) {
        const conditionString = Object.keys(conditions).map(key => `${key} = ${conditions[key]}`).join(' AND ');
        return `DELETE FROM ${tableName} WHERE ${conditionString}`;
    }
}
