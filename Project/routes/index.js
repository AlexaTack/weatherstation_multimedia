var express = require('express');
var router = express.Router();
var mqtt = require('mqtt')
var url = require('url');
var mqtt_url = process.env.CLOUDMQTT_URL || 'mqtt://postman.cloudmqtt.com:18028';
var options = { username: 'uusraxpu',password: 'PlGK8HdifXCS'};
var topic = process.env.CLOUDMQTT_TOPIC || 'test';
var client = mqtt.connect(mqtt_url, options);
var documents;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://andriesdeklerck:EM2X1IeuoJ98WUJN@temperatuurtest-ecobh.azure.mongodb.net/Temperatuur?retryWrites=true', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));


/* GET home page. */
router.get('/', function(req, res, next) {
  var config =  url.parse(mqtt_url);
  config.topic = topic;
  res.render('index', {
    connected: client.connected,
    config: config
  });
  
  db.once('open', function() {
	//connectie
	console.log("we're connected");
});
  
  
  
  Object.keys(mongoose.connection.models).forEach(key => {
      delete mongoose.connection.models[key];
    });
    
    //aanmaak schema
    var tempSchema = new mongoose.Schema({
    id: Number,
    temp: Number,
    lucht: Number
    });
    
    //schema compileren in model
    //eerste parameter is naam van collectie maar in enkelvoud (Value => values)
    var values = mongoose.model('values2', tempSchema);

    values.find(null, function (err, docs) {
      documents = docs;
        res.render('index', { temperatuur: JSON.stringify(docs)});
        console.log(JSON.stringify(docs))
    });
    
    //if(documents.id > 20){
      //db.col.remove({$where: "id > 1"});
    //}
});

client.on('connect', function() {
  router.post('/publish', function(req, res) {
	var msg = JSON.stringify({
	  date: new Date().toString(),
	  msg: req.body.msg
	});
    client.publish(topic, msg, function() {
      res.writeHead(204, { 'Connection': 'keep-alive' });
      res.end();
    });
  });

  router.get('/stream', function(req, res) {
    // send headers for event-stream connection
    // see spec for more information
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('\n');

    // Timeout timer, send a comment line every 20 sec
    var timer = setInterval(function() {
      res.write('event: ping' + '\n\n');
    }, 20000);

    client.subscribe(topic, function() {
      client.on('message', function(topic, msg, pkt) {
		//res.write("New message\n");
		var json = JSON.parse(msg);
        res.write("data: " + documents + ": " + json.msg + "\n\n");
      });
    });
  });
});

module.exports = router;
