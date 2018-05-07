## Arduino Builder
Files to serve back-end of Blockly4Arduino.
Compile/Build and return hex-file of requested code.

Makes use of the Arduino-Builder project used by the Arduino IDE. 

### Running the project
 - Download or clone this directory
 - run `npm install` in the current directory
 - change 'config.js' to specify your local paths and variables
 - run `(sudo) node server.js`
 - Go to: `http://localhost:{Port}/`. With {Port} being the port specified in the config.js-file. 
 - Write your code in the textbox and verify/upload it directly to your board.

### Development
#### JSON request to server
Your web app should send an JSON-request of the following format:
```JSON-request
{
	'data': ...,
	'boardName: ...
}
```
The 'data'-property should contain your program (text written in the textbox) and the 'boardName'-property should contain
the name of the board you want to compile code for (see 'Accepted board-types' below for the name).

#### JSON respons from the server
When sumbitting a request, the server will return a JSON-respons of the following format:
```JSON-response
{
	'hex': ...,
	'out': ...,
	'err': ...
}
```
The 'hex'-property contains the compiled program in hex-format, ready to be uploaded onto the board.
The 'out'-property contains all the outcomming messages of the compiler while the 'err'-property contains
error messages if there are any.

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

#### Chrome extension
[TO DO: place link to extension in chromestore]
