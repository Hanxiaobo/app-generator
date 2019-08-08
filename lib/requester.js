const http = require('http')

function requester(url) {
  var pm = new Promise(function (resolve, reject) {
    http.get(url, function (res) {
      var html = '';
      res.on('data', function (d) {
        html += d.toString()
      });
      res.on('end', function () {
        resolve(html);
      });
    }).on('error', function (e) {
      reject(e)
    });
  });
  return pm
}

module.exports = requester