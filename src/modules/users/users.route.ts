import { Router } from 'express';
import UserController from './users.controller';
import { Validation } from '@/middlewares/validation';
import { UserSchema } from '@/schema/user.schema';

const users: Router = Router();
const usersControler = new UserController();
const { validation } = new Validation();
const usersSchema = new UserSchema();

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
users.post('/create', validation(usersSchema.post), usersControler.create);
users.get('/list', validation(null), usersControler.list);
users.get('/detail/:id', validation(null), usersControler.detail);

export default users;
