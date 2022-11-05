import express, { Request, Response } from 'express';
import { OrderLine, OrderModel, ShopOrder } from '../models/order';

const orderRouter = express.Router();
const orderModel = new OrderModel();
/***************************************************** 
                        GET
 ****************************************************/
orderRouter.get('/', async (_req: Request, res: Response) => {
    try {
        const result = await orderModel.getAllShopOrders();
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No shop orders found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
orderRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await orderModel.getShopOrder(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No shop orders found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
orderRouter.get('/order_line/:orderID', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.orderID);
        const result = await orderModel.getAllOrderLines(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No shop orders found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
orderRouter.get('/order_line/one/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await orderModel.getOrderLine(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No shop orders found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        POST
 ****************************************************/
orderRouter.post('/', async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const {
            user_id,
            order_date,
            payment_id,
            shipping_address_id,
            total,
            order_status,
        } = req.body;

        const u: ShopOrder = {
            user_id,
            order_date,
            payment_id,
            shipping_address_id,
            total,
            order_status,
        };

        const result = await orderModel.createShopOrder(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
orderRouter.post('/order_line', async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const { order_id, product_item_id, quantity, price } = req.body;

        const u: OrderLine = {
            order_id,
            product_item_id,
            quantity,
            price,
        };

        const result = await orderModel.createOrderLine(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        PATCH
 ****************************************************/
orderRouter.patch('/:id', async (req: Request, res: Response) => {
    try {
        const oldShopOrder = await orderModel.getShopOrder(
            parseInt(req.params.id)
        );
        if (!oldShopOrder) {
            return res
                .status(404)
                .json({ message: `Could not find shop order` });
        }
        let newShopOrder = { ...oldShopOrder };
        Object.keys(oldShopOrder).forEach((key) => {
            if (req.body[key] && key !== 'id') {
                newShopOrder = { ...newShopOrder, [key]: req.body[key] };
            }
        });
        const result = await orderModel.modifyShopOrder(newShopOrder);
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
orderRouter.patch('/order_line/:id', async (req: Request, res: Response) => {
    try {
        const oldOrderLine = await orderModel.getShopOrder(
            parseInt(req.params.id)
        );
        if (!oldOrderLine) {
            return res
                .status(404)
                .json({ message: `Could not find order line` });
        }
        let newOrderLine = { ...oldOrderLine };
        Object.keys(oldOrderLine).forEach((key) => {
            if (req.body[key] && key !== 'id') {
                newOrderLine = { ...newOrderLine, [key]: req.body[key] };
            }
        });
        const result = await orderModel.modifyOrderLine(newOrderLine);
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        DELETE
 ****************************************************/
orderRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await orderModel.deleteShopOrder(id);
        if (!result || result?.length === 0) {
            return res
                .status(404)
                .json({ message: `Could not find shop order ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
orderRouter.delete('/order_line/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await orderModel.deleteOrderLine(id);
        if (!result || result?.length === 0) {
            return res
                .status(404)
                .json({ message: `Could not find order line ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

export default orderRouter;
