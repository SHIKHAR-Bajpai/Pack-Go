import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        req.user = user; 
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            return next(); 
        }
        else if (req.user) {
            return next();
        }
        else {
            return res.status(401).json({ success: false, message: "You're not authenticated" })
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authorized to access this" })
        }
    })
}
