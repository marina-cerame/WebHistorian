const path = require('path');
const fs = require('fs');
const archive = require('../helpers/archive-helpers');
// let index;
// fs.readFile('/Users/marinacerame/Documents/gitimmersion/opspark/sprints/WebHistorian/web/public/index.html', {encoding: 'utf-8'}, function (err, data) {
//   if (err) {
//     throw err;
//   }
//   index = data;
// });
// let loading;
// fs.readFile('/Users/marinacerame/Documents/gitimmersion/opspark/sprints/WebHistorian/web/public/loading.html', {encoding: 'utf-8'}, function (err, data) {
//   if (err) {
//     throw err;
//   }
//   loading = data;
// });
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  

  // let filePath = archive.paths.archivedSites + req.url;
  // if (req.method === 'GET') {
  //   if (req.url === '/') {
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.end(index);
  //   } else {
  //     fs.exists(filePath, (exists) => {
  //       if (exists) {
  //         console.log(filePath);
  //         let dest;
  //         fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
  //           if (err) { throw err; }
  //           dest = data;
  //         });
  //         console.log('HERE');
  //         res.writeHead(200, {'Content-Type': 'text/html'});
  //         res.end(dest);
  //       } else {
  //         console.log('HERE', filePath);
  //         res.writeHead(404, 'Go home ur drunk');
  //         res.end();
  //       }
  //     });
  //   }
  //
  // } else if (req.method === 'POST') {
  //   let body = '';
  //   req.on('data', function (chunk) {
  //     body += chunk;
  //   });
  //   req.on('end', function () {
  //     let newBody = body.substring(4);
  //     archive.addUrlToList(newBody);
  //     res.writeHead(302, {'Content-Type': 'text/html'});
  //     res.end(loading);
  //   });
  // } else {
  //   res.writeHead(404, 'Go home ur drunk');
  //   res.end();
  // }
};
