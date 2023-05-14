import { JournalLocation } from "../model/journalLocation";
import { AbstractRepository } from "./abstractRepository";
import { Database } from "./db";

export class JournalLocationRepository extends AbstractRepository<JournalLocation, number> {

    constructor() {
        super(Database.getInstance(), 'journal_location');
    }
}