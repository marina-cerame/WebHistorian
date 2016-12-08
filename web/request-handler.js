const path = require('path');
const fs = require('fs');
const archive = require('../helpers/archive-helpers');
const index = fs.readFileSync('/Users/marinacerame/Documents/gitimmersion/opspark/sprints/WebHistorian/web/public/index.html', {}, function (err, data) {
  if (err) {
    throw err;
  }
  return data;
});
const loading = fs.readFileSync('/Users/marinacerame/Documents/gitimmersion/opspark/sprints/WebHistorian/web/public/loading.html', {}, function (err, data) {
  if (err) {
    throw err;
  }
  return data;
});
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  let filePath = archive.paths.archivedSites + '/' + req.url;
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(index);
    } else {
      if (fs.existsSync(filePath)) {
        let dest = fs.readFileSync(filePath, {}, function (err, data) {
          if (err) { throw err; }
          return data;
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(dest);
      } else {
        res.writeHead(404, 'Go home ur drunk');
        res.end();
      }
    }
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      let newBody = body.substring(4);
      let fd = fs.openSync(archive.paths.list, 'w');
      fs.writeSync(fd, newBody + '\n');
      fs.closeSync(fd);
      res.writeHead(302, {'Content-Type': 'text/html'});
      res.end(loading);
    });
  } else {
    res.writeHead(404, 'Go home ur drunk');
    res.end();
  }
};
