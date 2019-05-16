import RPi.GPIO as GPIO
import time
import dht11

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()

instance = dht11.DHT11(pin = 4)
try:
  while True:
    result = instance.read()
    if result.is_valid():
	print("Temp: %d C" % result.temperature)
	print("Humidity: %d %%" % result.humidity)

except:
    GPIO.cleanup()
