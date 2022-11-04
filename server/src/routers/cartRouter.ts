import express, { Request, Response } from 'express';
import { Cart, CartItem, CartModel } from '../models/cart';

const cartRouter = express.Router();
const cartModel = new CartModel();

/***************************************************** 
                        GET
 ****************************************************/
cartRouter.get('/', async (_req: Request, res: Response) => {
    try {
        const result = await cartModel.getAllCarts();
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No carts found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

cartRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await cartModel.getCart(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No cart found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

cartRouter.get('/cart_items/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await cartModel.getCartItems(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No cart items found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

cartRouter.get('/user_carts/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await cartModel.getUserCarts(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No cart for user found' });
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
cartRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;
        const u: Cart = {
            user_id,
        };

        const result = await cartModel.createCart(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

cartRouter.post('/cart_item', async (req: Request, res: Response) => {
    try {
        const { cart_id, product_id, quantity } = req.body;
        const u: CartItem = {
            cart_id,
            product_id,
            quantity,
        };

        const result = await cartModel.createCartItem(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        PATCH
 ****************************************************/
cartRouter.patch('/cart_item_qty/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const quantity = req.body.quantity || 0;
        const result = await cartModel.modifyCartItemQuantity(id, quantity);
        if (!result || result?.length === 0) {
            return res
                .status(404)
                .json({ message: `Could not find cart item ${id}` });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        DELETE
 ****************************************************/
cartRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await cartModel.deleteCart(id);
        if (!result || result?.length === 0) {
            return res
                .status(404)
                .json({ message: `Could not find cart ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

cartRouter.delete('/cart_item/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await cartModel.deleteCartItem(id);
        if (!result || result?.length === 0) {
            return res
                .status(404)
                .json({ message: `Could not find cart item ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

export default cartRouter;
