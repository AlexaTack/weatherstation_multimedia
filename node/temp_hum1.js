var sensorLib = require("node-dht-sensor");
 
var sensor = {
    sensors: [ {
        type: 11,
        pin: 4
    }],
    read: function() {
        for (var a in this.sensors) {
            var b = sensorLib.read(this.sensors[a].type, this.sensors[a].pin);
            console.log("Temperatuur: " + b.temperature.toFixed(1) + "°C, " +
            "Luchtvochtigheid: " + b.humidity.toFixed(1) + "%");
        }
        setTimeout(function() {
            sensor.read();
        }, 2000);
    }
};
 
sensor.read();
