import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

routes(app);

app.listen(PORT, () =>
    console.log('Up and running on http://localhost:' + PORT)
);
