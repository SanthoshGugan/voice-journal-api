import { UserRepository } from '../repository/userRepository';
import { User } from '../model/user';
import AbstractService from './abstractService';

const userRepository = new UserRepository();

class UserService extends AbstractService<UserRepository, User, string> {

    constructor() {
        super(userRepository);
    }
};

export default UserService;