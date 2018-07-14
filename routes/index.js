var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST save an image. */
router.post('/save/', function(req, res, next) {
    
  var dir = './public/content/';
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, err => {})
  }

  var data_url = req.body.imgBase64;
  var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
  var ext = matches[1];
  var base64_data = matches[2];
  var buffer = new Buffer(base64_data, 'base64');

  fs.writeFileSync(dir + '/photo.png', buffer, 'binary');

  res.end();

  // console.log("picture saved.");

});


module.exports = router;
