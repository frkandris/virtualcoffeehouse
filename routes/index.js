var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  var filesAll = fs.readdirSync('./public/content/');
  var files = [];
  filesAll.forEach(function(element) {
    if ( element.endsWith('.png') & (!isNaN(element.substring(0,5)))) {
      files.push(element);
    };
  });

  res.render('index', { files: files });
});

/* POST save an image. */
router.post('/save/', function(req, res, next) {

  var dir = './public/content/';
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, err => {})
  }

  // FIXME validate userID
  var filename = req.body.userID + '.png';

  var data_url = req.body.imgBase64;
  var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
  var ext = matches[1];
  var base64_data = matches[2];
  var buffer = new Buffer(base64_data, 'base64');

  fs.writeFileSync(dir + filename, buffer, 'binary');

  res.end();

  // console.log("picture saved.");

});


module.exports = router;
