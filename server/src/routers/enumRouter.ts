import express, { Request, Response } from 'express';
import {
    EnumModel,
    PaymentType,
    OrderStatus,
    ProductCategory,
} from '../models/enum';

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

// order_status
enumRouter.get('/order_status', async (_req: Request, res: Response) => {
    try {
        const result = await enumModel.getAllOrderStats();
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No stats found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.get('/order_status/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await enumModel.getOrderStat(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No stat found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.post('/order_status', async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const { status } = req.body;
        const u: OrderStatus = { status };
        const result = await enumModel.createOrderStat(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.patch('/order_status/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const u: OrderStatus = { id, status: req.body.status };
        const result = await enumModel.updateOrderStat(u);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No ststus found' });
        }
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
enumRouter.delete('/order_status/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await enumModel.deleteOrderStat(id);
        if (!result) {
            return res
                .status(404)
                .json({ message: `Could not find status ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

export default enumRouter;
