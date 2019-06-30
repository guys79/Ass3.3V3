var DButilsAzure = require('./DButils');
var validator = require('./validator');

var savePoi = function savePoi(req, res) {
    if (validator.validateInjection(req)) {
        DButilsAzure.execQuery("INSERT INTO poisOfUser VALUES (" +
            "'" + req.body.username + "', " +
            "'" + req.body.poiName + "', " +
            "'" + req.body.position + "');"
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

var RemovePOI = function RemovePOI(req, res) {
    if (validator.validateInjection(req)) {
        DButilsAzure.execQuery("DELETE FROM poisOfUser WHERE username='" + req.body.username + "' AND poiName='" + req.body.poiname + "'")
            .then(function (result) {
                res.send(result);
            })
            .catch(function (err) {
                console.log(err);
                res.send(err);
            })
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};

var GetFavoritesCount = function GetFavoritesCount(req, res) {
    if (validator.validateInjection(req)) {
        DButilsAzure.execQuery("SELECT COUNT(*) FROM poisOfUser WHERE username='" + req.query.username + "'")
            .then(function (result) {
                res.send(result);
            })
            .catch(function (err) {
                console.log(err);
                res.send(err);
            })
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};

var GetAllFavoritesPOIs = function GetAllFavoritesPOIs(req, res) {
    if (validator.validateInjection(req)) {
        DButilsAzure.execQuery("SELECT * FROM poisOfUser WHERE username='" + req.query.username + "'")
            .then(function (result) {
                res.send(result);
            })
            .catch(function (err) {
                console.log(err);
                res.send(err);
            })
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};


var PopularPOIFromTopic = function PopularPOIFromTopic(req, res) {
    if (validator.validateInjection(req)) {
        DButilsAzure.execQuery("SELECT category1,category2 FROM users WHERE username='" + req.query.username + "'")
            .then(function (result) {
                DButilsAzure.execQuery("SELECT TOP 1 * FROM pois WHERE category='" + result[0]['category1'] + "'" +
                    " UNION " +
                    "SELECT TOP 1 * FROM pois WHERE category='" + result[0]['category2'] + "'")
                    .then(function (result2) {
                        res.send(result2);
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.send(err);
                    })
            })
            .catch(function (err) {
                console.log(err);
                res.send(err);
            })
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};


var UpdateFavoritesListOrder = function UpdateFavoritesListOrder(req, res) {
    if (validator.validateInjection(req)) {
        DButilsAzure.execQuery("UPDATE poisOfUser SET position='" + req.body.position + "' WHERE username='" + req.body.username + "' AND poiName='" + req.body.poiname + "'")
            .then(function (result) {
                res.send(result);
            })
            .catch(function (err) {
                console.log(err);
                res.send(err);
            })
    }
    else {
        const error = "bad input";
        res.status(403).json({ error });
    }
};



module.exports = { savePoi, RemovePOI, GetFavoritesCount, GetAllFavoritesPOIs, PopularPOIFromTopic, UpdateFavoritesListOrder};