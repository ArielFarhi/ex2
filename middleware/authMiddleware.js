const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'secret';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.userRole)) {
            return res.sendStatus(403);
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles
};