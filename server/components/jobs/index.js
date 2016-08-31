var glob = require('glob');
var path = require('path');
var schedule = require('node-schedule');

files = glob.sync(path.join(__dirname, '*.job.js'));
files.forEach(function (file) {
    var fileName = path.basename(file);
    var filePath = path.join(__dirname, fileName);
    console.log('JOB:', fileName);
    require(filePath)(schedule);
});

