import mysql, { Connection, RowDataPacket } from 'mysql2'


export class Database {
    private static instance: Database;
    private connection: Connection;

    private constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'santhosh',
            password: 'good12345',
            database: 'voice_journal'
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async queryAll<T = RowDataPacket[]>(sql: string, values?: any[] | any): Promise<T> {
        return new Promise<T>((res, rej) => {
            this.connection.query(sql, values, (error, results) => {
                if (error) {
                    rej(error);
                } else {
                    res(results as T);
                }
            });
        });
    }

    public async query<T = RowDataPacket>(sql: string, values?: any[] | any): Promise<T> {
        return new Promise<T>((res, rej) => {
            this.connection.query(sql, values, (error, results) => {
                if (error) {
                    rej(error);
                } else {
                    res(results as T);
                }
            });
        });
    }

    public close(): void {
        this.connection.end();
    }

}