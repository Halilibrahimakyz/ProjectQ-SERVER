const ErrorResponse = require('../helpers/errorResponse')
const { errors } = require('../helpers/errors');

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({
            result: null,
            error: "A token is required for authentication",
        });
    }
    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            result: null,
            error: "Invalid Token",
        });
    }
    return next();
};


const protect = async (req, res, next) => {

    let token;
    const { authorization, } = req.headers;

    if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.split(' ')[1];
    }

    if (!token) throw new ErrorResponse(errors.UN_AUTHORIZED);

    try {
        // Verify token
        jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
        // const sessionUser = await User.findByPk(decoded.id);

        // if (!sessionUser.validated) {
        //   throw new ErrorResponse(errors.USER_NOT_ACTIVE);
        // // }
        // req.user = sessionUser;
        // req.user.appLanguageId = languageid;

        next();
    } catch (err) {
        console.error("Hata:", err);
        throw new ErrorResponse(errors.UN_AUTHORIZED);
    }
};

module.exports = { verifyToken, protect }

// -- node
// require("crypto").randomBytes(64).toString('hex')
