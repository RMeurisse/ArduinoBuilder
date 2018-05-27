# Compile server
Project to serve back-end of Blockly4Arduino.
Compile your sketches or build your project and return .hex-file of requested code.
This project uses the arduino-builder tool used by the Arduino IDE. 

### Requirements
 - Linux or Ubuntu OS (Host or VM);
 - Node.js installed (https://nodejs.org/en/download/);
 - npm installed (if not installed with Node.js);
 - Latest version of the Arduino IDE installed (https://www.arduino.cc/en/Main/Software).

### Setting up the server
 - Download or clone following GitHub-directory: https://github.com/RMeurisse/ArduinoBuilder;
 - `cd` to downloaded directory;
 - Run `(sudo) npm install` in the current directory. This will install all dependencies specified in the manifest.json-file;
 - Change the file 'config.js' to specify your local paths and variables:
 	- Local './arduino-directory': this directory will contain the extra libraries you downloaded with the Arduino IDE;
	- Local './arduino-1.8.5-directory': this directory contains all the files used by the arduino-builder tool;
	- Local 'temporary'-directory: this is the directory where the arduino-builder tool will store it's temporary files, this can be a directory you created or you can use the '/tmp'-directory of Linux/Ubuntu.
 - Run `(sudo) node server.js`;
 - Go to: `http://localhost:{Port}/`. With {Port} being the port specified in the 'config.js'-file;
 - Write your code in the textbox and verify your code or upload it directly to a connected Arduino board;
 - (To automatically start the server at start-up, see next section).
 
### Automatic start server at start-up of the system
[TO DO]

### Development
#### POST request to server
Your website should send a HTTP POST-request with JSON-data of the following format:
```JSON-data of request message
{
	'data': 'void setup(){} void loop(){}',
	'boardName': 'uno'
}
```
The 'data'-property should contain your program (text written in the textbox) and the 'boardName'-property should contain
the name of the board you want to compile code for (see 'Accepted board-types' below for the name).

#### Response from the server
When sumbitting a request, the server will return a response message containing JSON-data of the following format:
```JSON-data of response message
{
	'hex': '...',
	'out': '...',
	'err': '...'
}
```
The 'hex'-property contains the compiled program in hex-format, ready to be uploaded onto the board.
The 'out'-property contains all the console messages of the compiler while the 'err'-property contains the
error messages if there was an error, otherwise this will be empty.

#### Accepted board-types/names
|Programmer|Board Option String|
|:----------|:--------------|
|Arduino Uno|`uno`|
|Arduino Mega|`mega`|
|Arduino ADK|`adk`|
|Arduino Leonardo|`leonardo`|
|Arduino Micro|`micro`|
|Arduino Nano|`nano`|
|Arduino Lilypad USB|`lilypad-usb`|
|Arduino Duemilanove|`duemilanove168`|
|Arduino Yun|`yun`|
|Arduino Esplora|`esplora`|
|RedBearLab Blend Micro|`blend-micro`|
|Tiny Circuits Tinyduino|`tinyduino`|
|SparkFun Pro Micro|`sf-pro-micro`|
|Qtechknow Qduino|`qduino`|
|Pinoccio Scout|`pinoccio`|
|Femtoduino IMUduino|`imuduino`|
|Adafruit Feather 32u4 Basic Proto|`feather`|
|Arduboy|`arduboy`|
|Adafruit Circuit Playground|`circuit-playground-classic`|
