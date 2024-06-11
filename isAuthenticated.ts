const jwt = require( "jsonwebtoken");

module.exports = async function isAuthenticated(req, res, next) {
    //const token = req.headers.authorization;
    const token = req.headers["authorization"].split(" ")[1];
    //console.log(token)
    jwt.verify(token, "secretkey", (err, user) => {
        if (err) {
            console.log(err)
            return res.json({ message: err });
        } else {
            req.user = user;
            //console.log(req.user)
            next();
        }
    });

};