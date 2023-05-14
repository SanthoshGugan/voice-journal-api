import { Journal } from "../model/journal";
import { AbstractRepository } from "./abstractRepository";
import { Database } from "./db";


export class JournalRepository extends AbstractRepository<Journal, number> {

    constructor() {
        super(Database.getInstance(), 'journal');
    }
}