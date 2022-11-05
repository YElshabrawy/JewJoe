import express, { Request, Response } from 'express';
import { Review, ReviewModel } from '../models/review';

const reviewRouter = express.Router();
const reviewModel = new ReviewModel();

/***************************************************** 
                        GET
 ****************************************************/
reviewRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await reviewModel.getAllReviews();
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No reviews found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
reviewRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await reviewModel.getReview(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No review found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
reviewRouter.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await reviewModel.getAllUserReviews(id);
        if (!result || result?.length === 0) {
            return res.status(404).json({ message: 'No user reviews found' });
        }
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});
reviewRouter.get('/product/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await reviewModel.getAllProductReviews(id);
        if (!result || result?.length === 0) {
            return res
                .status(404)
                .json({ message: 'No product reviews found' });
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
reviewRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { user_id, product_id, rating, comment } = req.body;
        const u: Review = {
            user_id,
            product_id,
            rating,
            comment,
        };
        const result = await reviewModel.createReview(u);
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        PATCH
 ****************************************************/
reviewRouter.patch('/:id', async (req: Request, res: Response) => {
    try {
        const oldReview = await reviewModel.getReview(parseInt(req.params.id));
        if (!oldReview) {
            return res.status(404).json({ message: `Could not find discount` });
        }
        let newReview = { ...oldReview };
        Object.keys(oldReview).forEach((key) => {
            if (req.body[key] && key !== 'id') {
                newReview = { ...newReview, [key]: req.body[key] };
            }
        });
        const result = await reviewModel.modifyReview(newReview);
        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

/***************************************************** 
                        DELETE
 ****************************************************/
reviewRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await reviewModel.deleteReview(id);
        if (!result || result?.length === 0) {
            return res
                .status(404)
                .json({ message: `Could not find review ${id}` });
        }

        return res.status(200).json(result);
        //@ts-ignore
    } catch (err: Error) {
        return res.status(400).json({ message: err.message });
    }
});

export default reviewRouter;
