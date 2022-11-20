import { Router } from 'express';
import userController from '../controllers/userController';

const routes = Router();

routes.post('/', userController.store);

export default routes;