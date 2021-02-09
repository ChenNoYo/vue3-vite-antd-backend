var gaze = require('gaze');
var exec = require('child_process').exec;
function beginWatch () {
  gaze('./routes/*.*', function (error, watcher) {
    this.on('all', function (event, filepath) {
      runGeneartion();
    })
  });
}

async function runGeneartion () {
  console.log('api文档更新')
  // nodemon 模式下无法正常生效
  var cmdStr = '@apidoc -i ./routes -o ./public/apidoc/';
  await exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      console.log(' error:' + stderr);
    } else {
      console.log(stdout);
    }
  });

}
beginWatch()