const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let docededData;

        if (token) {
            docededData = jwt.verify(token, process.env.SECRET);

            req.userId = docededData?.id;
        }

        next();

    } catch (error) {
        console.log(error);
    }
};

module.exports = auth;