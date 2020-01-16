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

import {
    createPublishment,
    getPublishments,
    getAllPublishmentsByUser
} from '../controllers/publishments';

import {
    createComment
} from '../controllers/comments';

const router = Router();

// HOME APP
router.get('/', getHome);

//CRUD USERS
router.get('/user/getAll',authToken, getUsers);
router.post('/user/createUser', createUser);
router.get('/user/:userId',authToken, getUser);
router.put('/user/:userId', authToken, updateUser);
router.delete('/user/:userId',authToken, deleteUser);

//CRUD publishment
router.post('/publishment/createPublishment', createPublishment);
router.get('/publishment/getAll', getPublishments);
router.get('/publishment/getAllByUser/:userId', getAllPublishmentsByUser);

//CRUD comment
router.post('/addComment', createComment);

// LOGIN
router.post('/login', login);


export default router;