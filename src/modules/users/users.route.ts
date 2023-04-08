import { Router } from 'express';
import UserController from './users.controller';
import UserSchema from '@/schema/user.schema';
import Validation from '@/middlewares/validation';

const users: Router = Router();
const controller = new UserController();
const { validation } = new Validation();
const schema = new UserSchema();

/**
 * Create user body
 * @typedef {object} CreateUserBody
 * @property {string} email.required - email of user
 * @property {string} name.required - name of user
 * @property {string} cognitoId.required - cognito id
 * @property {string} phone - phone number
 */
/**
 * User
 * @typedef {object} User
 * @property {string} email - email of user
 * @property {string} name - name of user
 * @property {string} cognitoId - cognito id
 * @property {string} phone - phone number
 */
/**
 * POST /users/create
 * @summary Create user
 * @tags users
 * @param {CreateUserBody} request.body.required
 * @return {User} 201 - user created
 */
users.post('/create', validation(schema.post), controller.create);
users.get('/list', validation(null), controller.list);
users.get('/detail/:id', validation(null), controller.detail);
users.put('/update/:id', validation(null), controller.update);
users.delete('/delete/:id', validation(null), controller.delete);

export default users;
