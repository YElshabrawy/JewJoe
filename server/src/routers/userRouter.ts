import express, { Request, Response } from 'express';
import { UserModel, User, UserPayment, UserAddress } from '../models/user';
import { cryptHash } from '../utils/cryptHash';

const usersRouter = express.Router();
const userModel = new UserModel();

// Get
// User
usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await userModel.getAllUsers();
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userModel.getUser(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No user found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(404).json({ message: err.message });
    }
});

// User payment
usersRouter.get('/:id/user_payments', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userModel.getUserPayments(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No user payments found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

// User Address
usersRouter.get('/:id/user_address', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userModel.getUserAddresses(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No user adresses found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

//////////////////////////////////////////////////////////////////
/////////////////////// Post /////////////////////////////////////
/////////////////////////////////////////////////////////////////

usersRouter.post('/', async (req: Request, res: Response) => {
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
        res.status(400).json({ message: err.message });
    }
});
// User payment
usersRouter.post('/user_payment', async (req: Request, res: Response) => {
    try {
        const { user_id, payment_type, provider, account_number, expiry_date } =
            req.body;

        const u: UserPayment = {
            user_id,
            payment_type,
            provider,
            account_number,
            expiry_date,
        };

        const result = await userModel.createUserPayment(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
// User Address
usersRouter.post('/user_address', async (req: Request, res: Response) => {
    try {
        const {
            user_id,
            adress_line1,
            adress_line2,
            city,
            postal_code,
            country,
        } = req.body;

        const u: UserAddress = {
            user_id,
            adress_line1,
            adress_line2,
            city,
            postal_code,
            country,
        };

        const result = await userModel.createUserAddress(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

//////////////////////////////////////////////////////////////////
/////////////////////// Patch ////////////////////////////////////
/////////////////////////////////////////////////////////////////

usersRouter.patch('/:id', async (req: Request, res: Response) => {
    try {
        const oldUser = await userModel.getUser(parseInt(req.params.id));
        if (!oldUser) {
            throw new Error(`Could not find user`);
        }
        let newUser = { ...oldUser };
        Object.keys(oldUser).forEach((key) => {
            if (req.body[key] && key !== 'id') {
                if (key === 'password') {
                    console.log('password has changed');
                    const hashedPassword = cryptHash(req.body[key]);

                    newUser = { ...newUser, [key]: hashedPassword };
                } else {
                    newUser = { ...newUser, [key]: req.body[key] };
                }
            }
        });
        const result = await userModel.modifyUser(newUser);
        res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        res.status(400).json({ message: err.message });
    }
});

//////////////////////////////////////////////////////////////////
/////////////////////// Delete ///////////////////////////////////
/////////////////////////////////////////////////////////////////

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userModel.deleteUser(id);
        if (!result) {
            throw new Error(`Could not find user ${id}`);
        }
        res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        res.status(404).json({ message: err.message });
    }
});

export default usersRouter;
