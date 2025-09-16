import { body, param, query, validationResult } from "express-validator";

export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }
    next();
};

// Auth validators
export const validateRegister = [
    body("username").isString().trim().isLength({ min: 3 }),
    body("email").isEmail().normalizeEmail(),
    body("password").isString().isLength({ min: 6 }),
    handleValidation,
];

export const validateLogin = [
    body("username").isString().trim().notEmpty(),
    body("password").isString().notEmpty(),
    handleValidation,
];

// Post validators
export const validateCreatePost = [
    body("title").isString().trim().isLength({ min: 1 }),
    body("desc").isString().trim().isLength({ min: 1 }),
    body("categories").optional().isArray(),
    handleValidation,
];

export const validateUpdatePost = [
    param("id").isString().notEmpty(),
    body("title").optional().isString().trim(),
    body("desc").optional().isString().trim(),
    body("categories").optional().isArray(),
    handleValidation,
];

// Comment validators
export const validateCreateComment = [
    body("postId").isString().notEmpty(),
    body("content").isString().trim().isLength({ min: 1 }),
    handleValidation,
];

export const validateUpdateComment = [
    param("id").isString().notEmpty(),
    body("content").optional().isString().trim().isLength({ min: 1 }),
    handleValidation,
];

// Category validators
export const validateCreateCategory = [
    body("name").isString().trim().isLength({ min: 1 }),
    handleValidation,
];


