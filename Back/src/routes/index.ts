import { Router } from 'express';
import user from './user.routes';

const routes = Router();

routes.use('/user', user);

export default routes;