'use strict';

import { Router } from 'express';

import { getHome } from '../controllers/index';
import { login } from '../controllers/login';
import { authToken } from '../middlewares/auth-token';

import {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/users';

const router = Router();

// HOME APP
router.get('/', getHome);

//CRUD USERS
router.get('/users',authToken, getUsers);
router.post('/user', createUser);
router.get('/user/:userId',authToken, getUser);
router.put('/user/:userId', authToken, updateUser);
router.delete('/user/:userId',authToken, deleteUser);


// LOGIN
router.post('/login', login);


export default router;