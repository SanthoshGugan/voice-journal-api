export const SELECT_USERS = "SELECT * FROM user;";

export const SELECT_ALL_ENTITIES = (tableName) => `SELECT * FROM ${tableName};`;

export const SELECT_BY_ID = tableName => `SELECT * FROM ${tableName} where id = ?;`;

export const INSERT_ENTITY = tableName => `INSERT INTO ${tableName} SET ?`

export const UPDATE_ENTITY = tableName => `UPDATE ${tableName} SET ? WHERE id = ?;`;

export const DELETE_ENTITY = tableName => `DELETE FROM ${tableName} WHERE id = ?;`;