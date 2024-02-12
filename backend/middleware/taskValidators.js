import { body } from 'express-validator';

//validator rules for adding task
const addTaskRules = [
    body('task_name').notEmpty().withMessage('Taskname is required !'),
    body('start_date').notEmpty().withMessage('Start Date is required !'),
    body('end_date').notEmpty().withMessage('End Date is required !'),
    body('status').notEmpty().withMessage('Status is required !'),
    body('details').notEmpty().withMessage('Status is required !'),
];


export { addTaskRules };