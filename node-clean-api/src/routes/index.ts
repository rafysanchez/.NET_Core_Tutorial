import { Router } from 'express';
import { authRouter } from './auth.routes';
import { productsRouter } from './products.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/products', productsRouter);

export { routes };
