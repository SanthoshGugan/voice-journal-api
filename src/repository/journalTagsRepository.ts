import { AbstractRepository } from "./abstractRepository";
import { Tags } from '../model/tags';
import { Database } from "./db";
import { JournalTag } from "../model/journalTags";

export class JournalTagsRepository extends AbstractRepository<JournalTag, number> {

    constructor() {
        super(Database.getInstance(), 'journal_tags');
    }
}