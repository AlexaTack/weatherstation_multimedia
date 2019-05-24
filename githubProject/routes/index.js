var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://andriesdeklerck:7vg8DFbhljPjY2Bi@temperatuurtest-ecobh.azure.mongodb.net/Temperatuur?retryWrites=true', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));

/* GET home page. */
router.get('/', function(req, res, next) {

db.once('open', function() {
	//connectie
	console.log("we're connected");
});

    //aanmaak schema
    var tempSchema = new mongoose.Schema({
    id: Number,
    temp: Number,
    lucht: Number
    });

    //schema compileren in model
    //eerste parameter is naam van collectie maar in enkelvoud (Value => values)
    var values = mongoose.model('values', tempSchema);
    
    // executes, passing results to callback
    values.find(null, function (err, docs) {
        res.render('index', { temperatuur: docs.id});
    });  
});

module.exports = router;
