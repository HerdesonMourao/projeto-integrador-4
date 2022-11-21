import { Router } from 'express';
import userController from '../controllers/userController';

const routes = Router();

routes.post('/', userController.store);
routes.get('/:id/all', userController.index);
routes.get('/:id', userController.show);
routes.put('/:id', userController.update);
routes.delete('/:id', userController.destroy);

export default routes;