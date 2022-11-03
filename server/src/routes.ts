import express from 'express';
import bodyParser from 'body-parser';

import userRouter from './routers/userRouter';
import indexRouter from './routers/indexRouter';

export default (app: express.Application) => {
    app.use(bodyParser.json());

    app.use('/', indexRouter);
    app.use('/user', userRouter);
};
