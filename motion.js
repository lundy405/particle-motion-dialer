var Particle = require('~/node_modules/particle-api-js');
var particle = new Particle();

var sleep = require('sleep');

var sys = require('sys')
var exec = require('child_process').exec;
var cooldown = 0
var dialcmd = "/usr/local/freeswitch/bin/fs_cli -x \"bgapi originate {ignore_early_media=true,originate_timeout=15}sofia/internal/1297@172.16.16.110 &playback(\"/usr/local/freeswitch/sounds/en/us/callie/misc/8000/ahoy.wav\")\"";


function puts(error, stdout, stderr) { sys.puts(stdout) }

console.log("Monitoring starts in 15 Seconds...");
sleep.sleep(15);
console.log("Monitoring Started!!!");
particle.getEventStream({ deviceId: 'mine', name: 'Movement', auth: 'myauthtoken'}).then(function(stream) {
  stream.on('event', function(data) {
        // console.log("Event: ", data.data);
        if (cooldown == 0 && data.data == "Motion Detected!!!" ) {
			exec(dialcmd, puts);
			cooldown++;
			}
		else {
			if (data.data == "Motion Stopped") {
				sleep.sleep(15);
				cooldown = 0;
				console.log("Cooldown reached");
				}
			else {
				console.log("Waiting to cooldown");
				}
		}
  });
});
