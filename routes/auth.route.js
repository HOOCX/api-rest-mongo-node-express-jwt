import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validationResultExpress } from '../middleware/validationResultExpress.js';
const router = express.Router();

router.post('/register',[
    body('username', "Formato de username incorrecto").trim().notEmpty().isLength({min: 5}),
    body('password', "Formato de password incorrecto")
    .trim()
    .notEmpty()
    .isLength({min: 8})
    .custom((value, {req}) => {
        if (value !== req.body.repassword) {
            throw new Error('Passwords do not match'); 
        }
        return value;
    }),
    body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail(),

], validationResultExpress, register);
router.post('/login', [
    body('password', "Formato de password incorrecto")
    .trim()
    .notEmpty()
    .isLength({min: 8}),
    body('email', "Formato de email incorrecto").trim().isEmail().normalizeEmail()
], validationResultExpress, login);


export default router;