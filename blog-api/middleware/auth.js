import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) return res.status(401).json("Access denied. No token provided.");

    const parts = authHeader.split(" ");
    const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, username }
        next();
    } catch (err) {
        return res.status(401).json("Invalid or expired token");
    }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const requestedUserId = req.params.id || req.body.userId;
        if (req.user?.id === requestedUserId) {
            return next();
        }
        return res.status(403).json("Not authorized for this action");
    });
};
