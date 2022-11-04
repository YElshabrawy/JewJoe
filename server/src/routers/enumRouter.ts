import express, { Request, Response } from 'express';
import { EnumModel, PaymentType, ProductCategory } from '../models/enum';

const enumRouter = express.Router();
const enumModel = new EnumModel();

// PaymentType
enumRouter.get('/payment_type', async (req: Request, res: Response) => {
    try {
        const result = await enumModel.getAllPaymentTypes();
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.post('/payment_type', async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const { type } = req.body;
        const u: PaymentType = { type };
        const result = await enumModel.createPaymentType(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.patch('/payment_type/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const u: PaymentType = { id, type: req.body.type };
        const result = await enumModel.updatePaymentType(u);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No payment type found' });
        }
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.delete('/payment_type/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await enumModel.deletePaymentType(id);
        if (!result) {
            return res
                .status(404)
                .json({ message: `Could not find payment type ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

// Categories
enumRouter.get('/category', async (_req: Request, res: Response) => {
    try {
        const result = await enumModel.getAllCategories();
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.post('/category', async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const { name } = req.body;
        const u: ProductCategory = { name };
        const result = await enumModel.createProductCategory(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.patch('/category/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const u: ProductCategory = { id, name: req.body.name };
        const result = await enumModel.updateProductCategory(u);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No category found' });
        }
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.delete('/category/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await enumModel.deleteProductCategory(id);
        if (!result) {
            return res
                .status(404)
                .json({ message: `Could not find category ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

export default enumRouter;
