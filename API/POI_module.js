var DButilsAzure = require('./DButils');
var validator = require('./validator');

var poiFeedback = function poiFeedback(req, res) {
    if (validator.validateInjection(req)) {
        DButilsAzure.execQuery("INSERT INTO reviews VALUES (" +
            "'" + req.body.username + "', " +
            "'" + req.body.poiName + "', " +
            "'" + req.body.score + "', " +
            "'" + req.body.text + "');"
        )
            .then(function (result) {
                res.send(result)
            })
            .catch(function (err) {
                console.log(err);
                res.send(err)
            })
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};

var getPOI = async function getPOI(req, res) {
    if (validator.validateInjection(req)) {
        var poi = await new Promise(async function (resolve, reject) {
            var user = await DButilsAzure.execQuery('SELECT * FROM pois WHERE poiName=' + "'" + req.body.poiName + "'");
            resolve(user[0]);
            reject("user not found");
        });
        if (poi) {
            res.status(200).json({ poi });
        }
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};

var GetRandomPopularPOI = function GetRandomPopularPOI(req, res) {
    DButilsAzure.execQuery('SELECT TOP 3 * FROM pois' +
        ' ORDER BY NEWID()')
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            console.log(err);
            res.send(err);
        })
};

var DetailedPOI = function DetailedPOI(req, res) {
    DButilsAzure.execQuery('SELECT * FROM pois WHERE poiName=' + "'" + req.query.id + "'")
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            console.log(err);
            res.send(err);
        })
};

var GetAllPOIs = function GetAllPOIs(req, res) {
    DButilsAzure.execQuery('SELECT * FROM pois')
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            console.log(err);
            res.send(err);
        })
};

var AddPoint = function AddPoint(req, res) {
    if (validator.validateInjection(req)) {
        DButilsAzure.execQuery("INSERT INTO pois VALUES (" +
            "'" + req.body.poiName + "', " +
            "'" + req.body.pictureName + "', " +
            "'" + req.body.category + "', " +
            "'" + req.body.views + "', " +
            "'" + req.body.description + "', " +
            "'" + req.body.score + "');"
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

module.exports = { poiFeedback, GetRandomPopularPOI, getPOI, DetailedPOI, GetAllPOIs, AddPoint };