const jwt = require('jsonwebtoken');

const SECRET = "supersecret123";

function generateToken(user) {
    return jwt.sign({ userId: user.id, email: user.email },
        SECRET,
        { expiresIn: "1h" }
    );
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET);
    }
    catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};