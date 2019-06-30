var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Users_M = require('./Users_module');
const POI_M = require('./POI_module');
const Users_POI_M = require('./Users_POI_module');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());
app.options('*',cors());

// Users
app.post("/registerUser", (req, res) => {Users_M.registerUser(req, res)});
app.post("/login", (req, res) => {Users_M.login(req, res)});
app.post("/private", (req, res) => {Users_M.private(req, res)});
app.post("/insertQuestion", (req, res) => {Users_M.insertQuestion(req, res)});
app.post("/restorePassword", (req, res) => {Users_M.restorePassword(req, res)});

// POIs
app.post("/poiFeedback", (req, res) => {POI_M.poiFeedback(req, res)});
app.get("/GetRandomPopularPOI", (req, res) => {POI_M.GetRandomPopularPOI(req, res)});
app.get("/DetailedPOI", (req, res) => {POI_M.DetailedPOI(req, res)});
app.get("/GetAllPOIs", (req, res) => {POI_M.GetAllPOIs(req, res)});
app.post("/getPOI", (req, res) => { POI_M.getPOI(req, res) });
app.post("/AddPoint", (req, res) => { POI_M.AddPoint(req, res) });

// Users' POIs
app.post("/savePoi", (req, res) => {Users_POI_M.savePoi(req, res)});
app.del("/RemovePOI",(req, res) => {Users_POI_M.RemovePOI(req, res)});
app.get("/GetFavoritesCount",(req, res) => {Users_POI_M.GetFavoritesCount(req, res)});
app.get("/GetAllFavoritesPOIs",(req, res) => {Users_POI_M.GetAllFavoritesPOIs(req, res)});
app.get("/PopularPOIFromTopic", (req, res) => { Users_POI_M.PopularPOIFromTopic(req, res) });
app.put("/UpdateFavoritesListOrder", (req, res) => { Users_POI_M.UpdateFavoritesListOrder(req, res) });


var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

