#!/bin/bash
# Get information from DHT11 Temperature and Humidity Sensor
# /sys/bus/iio/devices/iio:device0
while true
doTEMP=`cat /sys/bus/iio/devices/iio\:device0/in_temp_input`
echo "Current TEMP is: `expr $TEMP / 1000` C"
sleep 10
HUMIDITY=`cat /sys/bus/iio/devices/iio\:device0/in_humidityrelative_input`
echo "Current Humidityrelative is: `expr $HUMIDITY / 1000` %"
sleep 10
clear
done

