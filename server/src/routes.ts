import express from 'express';
import bodyParser from 'body-parser';

import indexRouter from './routers/indexRouter';
import enumRouter from './routers/enumRouter';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';
import discountRouter from './routers/discountRouter';
import cartRouter from './routers/cartRouter';
import reviewRouter from './routers/reviewRouter';
import orderRouter from './routers/orderRouter';

export default (app: express.Application) => {
    app.use(bodyParser.json());

    app.use('/', indexRouter);
    app.use('/enum', enumRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/discount', discountRouter);
    app.use('/cart', cartRouter);
    app.use('/review', reviewRouter);
    app.use('/order', orderRouter);
};
