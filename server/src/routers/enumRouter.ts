import express, { Request, Response } from 'express';
import { EnumModel, PaymentType } from '../models/enum';

const enumRouter = express.Router();
const enumModel = new EnumModel();

// Post
enumRouter.post('/payment_type', async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const { type } = req.body;
        const u: PaymentType = { type };
        const result = await enumModel.createPaymentType(u);
        res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        res.status(400).json({ message: err.message });
    }
});

export default enumRouter;
