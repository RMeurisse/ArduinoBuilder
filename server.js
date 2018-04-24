const express = require('express');
const app = express();
const fs = require('fs');
const exec = require('child_process').exec, child;
//const testscript = exec('sh /home/robin/zzzArduinoBuilder/zzzscript.sh');

/*testscript.stdout.on('data', function(data){
    console.log(data);     
	// sendBackInfo();
});

testscript.stderr.on('data', function(data){
    console.log(data);
    // triggerErrorStuff(); 
});*/

app.get('/', function (req, res) {
	fs.readFile('/home/robin/zzzArduinoBuilder/zzz/zzzSketch.ino.hex', 'utf8', function(err, data) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON.stringify({hex : data}));
		res.end();
	});
	//res.send('Hello World!')
});

app.listen(7000, () => console.log('Example app listening on port 7000!'));
