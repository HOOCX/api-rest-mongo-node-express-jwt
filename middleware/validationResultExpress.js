import { validationResult } from "express-validator";
export const validationResultExpress = (req, res, next) => {
    // Validation logic here
    //res.send('Validation successful');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};