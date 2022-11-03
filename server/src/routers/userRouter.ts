import express, { Request, Response } from 'express';
import { UserModel, User } from '../models/user';

const usersRouter = express.Router();

const userModel = new UserModel();

// Get
usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await userModel.getAllUsers();
        res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        res.status(404).json(err.message);
    }
});

//Post
usersRouter.post('/', async (req, res) => {
    try {
        //@ts-ignore
        const {
            username,
            email,
            password,
            firstname,
            lastname,
            phone,
            is_admin,
        } = req.body;

        const u: User = {
            username,
            email,
            password,
            firstname,
            lastname,
            phone,
            is_admin,
        };

        const result = await userModel.createUser(u);
        res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        res.status(400).json(err.message);
    }
});

export default usersRouter;
