import { AbstractRepository } from "./abstractRepository";
import { Tags } from '../model/tags';
import { Database } from "./db";

export class TagsRepository extends AbstractRepository<Tags, number> {

    constructor() {
        super(Database.getInstance(), 'tags');
    }
}