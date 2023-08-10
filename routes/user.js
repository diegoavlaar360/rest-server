const express = require('express');
const router = express.Router();

const {getUsers, createUser, login}=require('../controller/user');

router.get('/', getUsers);

router.post('/create', createUser);

router.post('/login', login);

module.exports = router;