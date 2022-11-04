import express, { Request, Response } from 'express';
import { ProductModel, Product } from '../models/product';

const productRouter = express.Router();
const productModel = new ProductModel();

/***************************************************** 
                        GET
 ****************************************************/
productRouter.get('/', async (_req: Request, res: Response) => {
    try {
        const result = await productModel.getAllProducts();
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
productRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await productModel.getProduct(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No product found' });
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
productRouter.post('/', async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const {
            name,
            description,
            price,
            images,
            quantity,
            category,
            discount_name,
        } = req.body;

        const u: Product = {
            name,
            description,
            price,
            images,
            quantity,
            category,
            discount_name,
        };

        const result = await productModel.createProduct(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        PATCH
 ****************************************************/
productRouter.patch('/:id', async (req: Request, res: Response) => {
    try {
        let oldProduct = await productModel.getProduct(parseInt(req.params.id));
        if (!oldProduct) {
            return res.status(404).json({ message: `Could not find product` });
        }
        oldProduct = { ...oldProduct, quantity: req.body.quantity };
        let newProduct = { ...oldProduct };
        Object.keys(oldProduct).forEach((key) => {
            if (req.body[key] && key !== 'id' && key !== 'inventory_id') {
                newProduct = { ...newProduct, [key]: req.body[key] };
            }
        });
        const result = await productModel.modifyProduct(
            newProduct,
            newProduct?.inventory_id,
            newProduct?.category_id,
            newProduct?.discount_id
        );
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        DELETE
 ****************************************************/
productRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await productModel.deleteProduct(id);
        if (!result) {
            return res
                .status(404)
                .json({ message: `Could not find product ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

export default productRouter;
