const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const spawn = require('child_process').spawn;
const rimraf = require('rimraf');
const cors = require('cors');
const config = require('./config');

// Load the config parameters from the config.js-file
var LOCALARDUINOPATH = config.localArduinoPath;
var BUILDERPATH = config.builderPath;
var LOCALBUILDPATH = config.localBuildPath;

// Extend functionality of express() with these submodules
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// GET - Check if the server is active
app.get('/', function (req, res) {
	res.writeHead(200);
	res.write('Server is functional');
	res.end();
});

// POST - Compiles the requested code and returns the hex-file in the response
app.post('/compile', function (req, res) {
	if(req.body['data'] !== undefined && req.body['boardName'] !== undefined) {
		var sketchName = 'tmp'+ parseInt(Math.random()*10000);
		var boardName = req.body['boardName'];
		var mainBuildPath = LOCALBUILDPATH+'/'+sketchName;
		var sketchPath = LOCALBUILDPATH+'/'+sketchName+'/'+sketchName+'.ino';
		var buildPath = LOCALBUILDPATH+'/'+sketchName+'/'+sketchName;

		// Make tmp folder where arduino-builder will write compiled files to
		fs.mkdir(mainBuildPath, function(err) {
			if(err) {
				return console.log(err);
			} else {
				fs.mkdir(buildPath, function(err) {
					if(err) {
						return console.log(err);
					}
				});
				// Write (or overwrite) content of the .ino-file
				fs.writeFile(sketchPath, req.body['data'], 'utf8', function(err) {
					if(err) {
						return console.log(err);
					} else {
						var outMsg = '';
						var errMsg = '';						
				
						// Compile sketch
						//var command = spawn('sh', ['/home/robin/zzzArduinoBuilder/script.sh', sketchName]); // Use this command if you want to run bash script instead of command
						var command = spawn(BUILDERPATH+'/arduino-builder', ['-compile', '-hardware', BUILDERPATH+'/hardware', '-build-path', buildPath, '-tools', BUILDERPATH+'/hardware/tools', '-tools', BUILDERPATH+'/tools-builder', '-libraries', BUILDERPATH+'/libraries', '-libraries', LOCALARDUINOPATH+'/libraries', '-fqbn', boardName, sketchPath]); 		

						command.stdout.on('data', function(data) {
							outMsg += '\n' + data;						
							//console.log('stdout(' + command.pid + '): ' + data);	
						});

						command.stderr.on('data', function(data) {
							errMsg += '\n' + data;
							//console.log('stderr(' + command.pid + '): ' + data);
						});

						command.on('close', function(code) {
							if (code === 0) {
								fs.readFile(buildPath+'/'+sketchName+'.ino.hex', 'utf8', function(err, data) {
									//console.log('close(' + command.pid + '): Sending hex as response');					
									res.writeHead(200, {'Content-Type': 'application/json'});
									res.write(JSON.stringify({'hex':data, 'out':outMsg, 'err':errMsg}));
									res.end();
								});	
							} else {
								res.sendStatus(500); // Server error
							}
							// Delete tmp folder and sketch to save space
							rimraf(mainBuildPath, function(){
								console.log('cleared dir(' + command.pid + ')');
							});
						});	
					}
				});	
			}
		});		
	} else {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({'err':'Empty JSON request send from client'}));
		res.end();
		//console.log('Error: empty JSON request');
	}
});

app.listen(config.port, () => console.log('Compile server listening on port ' + config.port + '!'));
