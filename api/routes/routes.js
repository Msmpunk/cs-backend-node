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
    getPublishment,
    getAllPublishmentsByUser
} from '../controllers/publishments';

import {
    createComment
} from '../controllers/comments';

const router = Router();

// HOME APP
router.get('/', getHome);

//CRUD USERS
router.get('/users',authToken, getUsers);
router.post('/user', createUser);
router.get('/user/:userId',authToken, getUser);
router.put('/user/:userId', authToken, updateUser);
router.delete('/user/:userId',authToken, deleteUser);

//CRUD publishment
router.post('/addPublishment', createPublishment);
router.get('/getPublishment/:userId', getPublishment);
router.get('/getAllPublishmentsById/:userId', getAllPublishmentsByUser);

//CRUD comment
router.post('/addComment', createComment);


// LOGIN
router.post('/login', login);


export default router;