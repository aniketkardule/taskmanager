import { body } from 'express-validator';

//validators for registering new user
const createUserRules = [
    body('name').notEmpty().withMessage('Name is not provided!'),
    body('email').isEmail().withMessage('Email is not provided or incorrect email !'),
    body('password').isLength({ min: 8 }).withMessage('Password must be 8 characters long')
];

// validators for login user
const loginUserRules = [
    body('email').isEmail().withMessage('Provide correct email for login'),
    body('password').isLength({ min: 8}).withMessage('Provide password least 8 characters long!')
]

export { createUserRules, loginUserRules };