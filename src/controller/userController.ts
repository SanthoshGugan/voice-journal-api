import express, { Request, Response } from "express";
import UserService from "../service/userService";
import AbstractController from "./abstractController";
import { User } from "../model/user";

const userService = new UserService();

class UserController extends AbstractController<UserService, User, string> {

    constructor() {
        super(userService);
    }

}

export default UserController;