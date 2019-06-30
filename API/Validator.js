var countries = "<Countries><Country><ID>1</ID><Name>Australia</Name></Country>" +
    "<Country><ID>2</ID><Name>Bolivia</Name></Country>" +
    "<Country><ID>3</ID><Name>China</Name></Country>" +
    "<Country><ID>4</ID><Name>Denemark</Name></Country>" +
    "<Country><ID>5</ID><Name>Israel</Name></Country>" +
    "<Country><ID>6</ID><Name>Latvia</Name></Country>" +
    "<Country><ID>7</ID><Name>Monaco</Name></Country>" +
    "<Country><ID>8</ID><Name>August</Name></Country>" +
    "<Country><ID>9</ID><Name>Norway</Name></Country>" +
    "<Country><ID>10</ID><Name>Panama</Name></Country>" +
    "<Country><ID>11</ID><Name>Switzerland</Name></Country>" +
    "<Country><ID>12</ID><Name>USA</Name></Country></Countries>";

var validateInjection = function validateInjection(req) {
    var forbiddens = ["--", "=", "==", " AND ", " OR ", " and ", " or "];
    for (var key in req.body) {
        for (var str in forbiddens) {
            if (req.body[key].includes(forbiddens[str])) {
                return false;
            }
        }
    }
    return true;
}

var validateName = function validateName(name) {
    return /^[A-Za-z ]+$/.test(name);
}

var validateEmail = function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


module.exports = { validateInjection, validateName, validateEmail };