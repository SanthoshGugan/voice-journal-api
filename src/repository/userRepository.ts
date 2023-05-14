import { User } from "../model/user";
import { AbstractRepository } from "./abstractRepository";
import { Database } from './db';
import { SELECT_USERS } from "./queries";

export class UserRepository extends AbstractRepository<User, string> {


    constructor() {
        super(Database.getInstance(), 'user');
    }
}