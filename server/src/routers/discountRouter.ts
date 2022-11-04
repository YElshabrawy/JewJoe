import express, { Request, Response } from 'express';
import { Discount, DiscountModel } from '../models/discount';

const discountRouter = express.Router();
const discountModel = new DiscountModel();
/***************************************************** 
                        GET
 ****************************************************/
discountRouter.get('/', async (_req: Request, res: Response) => {
    try {
        const result = await discountModel.getAllDiscounts();
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No discounts found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
discountRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await discountModel.getDiscount(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No discount found' });
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
discountRouter.post('/', async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const { name, description, percentage, active } = req.body;

        const u: Discount = {
            name,
            description,
            percentage,
            active,
        };

        const result = await discountModel.createDiscount(u);
        return res.status(200).json(result);

        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        PATCH
 ****************************************************/
discountRouter.patch('/:id', async (req: Request, res: Response) => {
    try {
        const oldDiscount = await discountModel.getDiscount(
            parseInt(req.params.id)
        );
        if (!oldDiscount) {
            return res.status(404).json({ message: `Could not find discount` });
        }
        let newDiscount = { ...oldDiscount };
        Object.keys(oldDiscount).forEach((key) => {
            if (req.body[key] && key !== 'id') {
                newDiscount = { ...newDiscount, [key]: req.body[key] };
            }
        });
        const result = await discountModel.modifyDiscount(newDiscount);
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

discountRouter.patch(
    '/apply/:id/:productID',
    async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const productID = parseInt(req.params.productID);
            console.log('hi ', id, productID);
            const result = await discountModel.applyProductDiscount(
                id,
                productID
            );
            if (!result || result?.length === 0) {
                return res.status(404).json({
                    message: 'Discount ID or product ID could be wrong',
                });
            }

            return res.status(200).json(result);

            //@ts-ignore
        } catch (err: Error) {
            return res.status(400).json({ message: err.message });
        }
    }
);

discountRouter.patch(
    '/remove/:productID',
    async (req: Request, res: Response) => {
        try {
            const productID = parseInt(req.params.productID);

            const result = await discountModel.removeProductDiscount(productID);
            if (!result || result?.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Product ID is invalid' });
            }
            return res.status(200).json(result);

            //@ts-ignore
        } catch (err: Error) {
            return res.status(400).json({ message: err.message });
        }
    }
);

/***************************************************** 
                        DELETE
 ****************************************************/
discountRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await discountModel.deleteDiscount(id);
        if (!result || result?.length === 0) {
            return res
                .status(404)
                .json({ message: `Could not find discount ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

export default discountRouter;
