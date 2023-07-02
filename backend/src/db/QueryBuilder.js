export class QueryBuilder {
    /**
     * Constructs a SELECT query.
     *
     * @param {string} tableName - The name of the table to select from.
     * @param {string[]} columns - The columns to select.
     * @param conditions
     * @returns {Object} The constructed SQL query with text and values.
     */
    select(tableName, columns = ['*'], conditions = {}) {
        const columnsString = columns.join(', ');

        const conditionKeys = Object.keys(conditions);
        let conditionsString = '';
        let values = [];

        if (conditionKeys.length > 0) {
            conditionsString = ' WHERE ' + conditionKeys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
            values = Object.values(conditions);
        }

        return {
            text: `SELECT ${columnsString} FROM ${tableName}${conditionsString}`,
            values: values,
        };
    }

    /**
     * Constructs an INSERT query.
     *
     * @param {string} tableName - The name of the table to insert into.
     * @param {Object} data - The data to insert.
     * @returns {Object} The constructed SQL query with text and values.
     */
    insert(tableName, data) {
        const keys = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map((_, i) => `$${i + 1}`).join(', ');
        return {
            text: `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`,
            values: Object.values(data),
        };
    }

    /**
     * Constructs an UPDATE query.
     *
     * @param {string} tableName - The name of the table to update.
     * @param {Object} data - The data to update.
     * @param {Object} conditions - The conditions to determine which rows to update.
     * @returns {Object} The constructed SQL query with text and values.
     */
    update(tableName, data, conditions) {
        const setData = Object.keys(data);
        const setPlaceholders = setData.map((_, i) => `$${i + 1}`).join(', ');
        const setString = setData.map((key, i) => `${key} = $${i + 1}`).join(', ');

        const conditionData = Object.keys(conditions);
        const conditionPlaceholders = conditionData.map((_, i) => `$${i + setData.length + 1}`).join(' AND ');
        const conditionString = conditionData.map((key, i) => `${key} = $${i + setData.length + 1}`).join(' AND ');

        return {
            text: `UPDATE ${tableName} SET ${setString} WHERE ${conditionString}`,
            values: [...Object.values(data), ...Object.values(conditions)],
        };
    }

    /**
     * Constructs a DELETE query.
     *
     * @param {string} tableName - The name of the table to delete from.
     * @param {Object} conditions - The conditions to determine which rows to delete.
     * @returns {Object} The constructed SQL query with text and values.
     */
    delete(tableName, conditions) {
        const conditionData = Object.keys(conditions);
        const conditionPlaceholders = conditionData.map((_, i) => `$${i + 1}`).join(' AND ');
        const conditionString = conditionData.map((key, i) => `${key} = $${i + 1}`).join(' AND ');

        return {
            text: `DELETE FROM ${tableName} WHERE ${conditionString}`,
            values: Object.values(conditions),
        };
    }
}
