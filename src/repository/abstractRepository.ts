import { Database } from "./db";
import { DELETE_ENTITY, INSERT_ENTITY, SELECT_ALL_ENTITIES, SELECT_BY_FIELD, SELECT_BY_ID, UPDATE_ENTITY } from "./queries";

export class AbstractRepository<T, I> {

    protected db: Database;
    protected tableName: string;

    constructor(db: Database, tableName: string) {
        this.db = db;
        this.tableName = tableName;
    };

    public async getAll(): Promise<T []> {
        const entities: T[] = await this.db.queryAll(SELECT_ALL_ENTITIES(this.tableName));
        return entities;
    };

    public async getById(id: I): Promise<T | null> {
        const entity: T | null = await this.db.query(SELECT_BY_ID(this.tableName), [id]);
        return entity;
    };

    public async getByField(field: string, value: any): Promise<T | null> {
        console.log(" field select query : " + SELECT_BY_FIELD(this.tableName, field));
        const entity: T | null = await this.db.query(SELECT_BY_FIELD(this.tableName, field), [value]);
        return entity;
    }

    public async add(entity: T): Promise<T> {
        const result: any = await this.db.query(INSERT_ENTITY(this.tableName), [entity]);
        const addedEntity = {...entity, id: result.insertId } as T;
        return addedEntity;
    };

    public async update(entity: T, id: I): Promise<T> {
        const updatedEntity: T = await this.db.query(UPDATE_ENTITY(this.tableName), [entity, id]);
        return updatedEntity;
    };

    public async delete(id: I): Promise<void> {
        await this.db.query(DELETE_ENTITY(this.tableName), [id]);
    };
}