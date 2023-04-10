import { Router } from 'express';
import MaknaController from './makna.controller';
import MaknaSchema from '@/schema/user.schema';
import Validation from '@/middlewares/validation';

const users: Router = Router();
const controller = new MaknaController();
const { validation } = new Validation();
const schema = new MaknaSchema();

users.post('/create', validation(schema.post), controller.create);
users.get('/list', validation(null), controller.list);
users.get('/detail/:id', validation(null), controller.detail);
users.put('/update/:id', validation(null), controller.update);
users.delete('/delete/:id', validation(null), controller.delete);

export default users;
