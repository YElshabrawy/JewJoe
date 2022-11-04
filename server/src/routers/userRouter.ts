import express, { Request, Response } from 'express';
import { UserModel, User, UserPayment, UserAddress } from '../models/user';
import { cryptHash } from '../utils/cryptHash';

const usersRouter = express.Router();
const userModel = new UserModel();

// Get
// User
usersRouter.get('/', async (_req: Request, res: Response) => {
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
        return res.status(400).json({ message: err.message });
    }
});

// User payment
usersRouter.get('/:id/user_payment', async (req: Request, res: Response) => {
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
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
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
            return res.status(404).json({ message: `Could not find user` });
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
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

usersRouter.patch('/user_address/:id', async (req: Request, res: Response) => {
    try {
        const oldAddress = await userModel.getAddress(parseInt(req.params.id));
        if (!oldAddress) {
            return res.status(404).json({ message: `Could not find address` });
        }
        let newAddress = { ...oldAddress };
        Object.keys(oldAddress).forEach((key) => {
            if (req.body[key] && key !== 'id' && key !== 'user_id') {
                newAddress = { ...newAddress, [key]: req.body[key] };
            }
        });
        const result = await userModel.modifyUserAddress(newAddress);
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

usersRouter.patch('/user_payment/:id', async (req: Request, res: Response) => {
    try {
        const oldPayment = await userModel.getPayment(parseInt(req.params.id));
        if (!oldPayment) {
            return res.status(404).json({ message: `Could not find payment` });
        }
        let newPayment = { ...oldPayment };
        Object.keys(oldPayment).forEach((key) => {
            if (req.body[key] && key !== 'id' && key !== 'user_id') {
                newPayment = { ...newPayment, [key]: req.body[key] };
            }
        });
        const result = await userModel.modifyUserPayment(newPayment);
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
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
            return res
                .status(404)
                .json({ message: `Could not find user ${id}` });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

usersRouter.delete('/user_address/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userModel.deleteUserAddress(id);
        if (!result) {
            return res
                .status(404)
                .json({ message: `Could not find address ${id}` });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

usersRouter.delete('/user_payment/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userModel.deleteUserPayment(id);
        if (!result) {
            return res
                .status(404)
                .json({ message: `Could not find payment ${id}` });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

export default usersRouter;
