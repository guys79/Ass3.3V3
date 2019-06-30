const jwt = require("jsonwebtoken");

var DButilsAzure = require('./DButils');
var secret = "ourSecret";
var validator = require('./validator');

var registerUser = function registerUser(req, res) {
    if (validator.validateInjection(req) && validator.validateName(req.body.firstName) && validator.validateName(req.body.lastName) && validator.validateEmail(req.body.email) ) {
        DButilsAzure.execQuery("INSERT INTO users VALUES (" +
            "'" + req.body.username + "', " +
            "'" + req.body.password + "', " +
            "'" + req.body.firstName + "', " +
            "'" + req.body.lastName + "', " +
            "'" + req.body.city + "', " +
            "'" + req.body.country + "', " +
            "'" + req.body.email + "', " +
            "'" + req.body.category1 + "', " +
            "'" + req.body.category2 + "');"
        )
            .then(function (result) {
                res.send(result)
            })
            .catch(function (err) {
                console.log(err)
                res.send(err)
            })
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};

var login = async function login(req, res) {
    if (validator.validateInjection(req)) {
    const user = await getUser(req.body.username);
        if(user) {
            if (user.password !== req.body.password) {
                const error = "wrong password";
                res.status(403).json({error});
            } else {
                //create the token.
                const token = jwt.sign(user, secret);
                res.status(200).send({"token": token});
            }
        }
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};

function getUser(username) {
    return new Promise(async function (resolve, reject) {
        var user = await DButilsAzure.execQuery('SELECT * FROM users WHERE username=' + "'" + username + "'");
        resolve(user[0]);
        reject("user not found");
    });
}

var private = function private(req, res) {
    const token = req.header("x-auth-token");
    // no token
    if (!token) res.status(401).send("Access denied. No token provided.");
    // verify token
    try {
        req.decoded = jwt.verify(token, secret);
        res.status(200).send({ result: "valid token" });
    } catch (exception) {
        res.status(400).send({ result: "invalid token" });
    }
};

var insertQuestion = function insertQuestion(req, res) {
    if (validator.validateInjection(req)) {
        DButilsAzure.execQuery("INSERT INTO questions VALUES (" +
            "'" + req.body.username + "', " +
            "'" + req.body.question + "', " +
            "'" + req.body.answer + "');"
        )
            .then(function (result) {
                res.send(result)
            })
            .catch(function (err) {
                console.log(err)
                res.send(err)
            })
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};

var restorePassword = async function restorePassword(req, res) {
    var message = "";
    var user = await getUserForQuestion(req.body.username, req.body.question);
    if (user) {
        if (user.answer === req.body.answer) {
            var currUser = await getUser(user.username);
            message = currUser.password;
            res.status(200).json({ message });
        } else {
            message = "wrong answer";
            res.status(403).json({ message });
        }
    }
};

function getUserForQuestion(username, question) {
    return new Promise(async function (resolve, reject) {
        var user = await DButilsAzure.execQuery('SELECT * FROM questions WHERE username=' + "'" + username + "'" + ' AND question=' + "'" + question + "'");
        resolve(user[0]);
        reject("user not found");
    });
}

module.exports = { registerUser, login, private, insertQuestion, restorePassword };


