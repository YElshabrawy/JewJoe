import express from 'express';
import bodyParser from 'body-parser';

import indexRouter from './routers/indexRouter';
import enumRouter from './routers/enumRouter';
import userRouter from './routers/userRouter';

export default (app: express.Application) => {
    app.use(bodyParser.json());

    app.use('/', indexRouter);
    app.use('/enum', enumRouter);
    app.use('/user', userRouter);
};
