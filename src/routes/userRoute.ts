import express, { Request, Response } from 'express';
import UserController from '../controller/userController';

const router = express.Router();
const userController = new UserController();

router.get('/', async (req: Request, res: Response) => {
    await userController.getAll(req, res)});


router.get('/:id', async (req: Request, res: Response) => {
    await userController.getById(req, res)});

router.post('/register', async (req: Request, res: Response) => {
    await userController.add(req, res);
});

// login user

// logout user

export default router;