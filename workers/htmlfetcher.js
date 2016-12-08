var http = require('http');
var fs = require('fs');

exports.downloadPage = downloadPage = (url, fileName) => {
  http.get(url, response => {
    if (response.statusCode !== 200) {
      if (response) {
        console.log(response.statusCode + 'ERROR thrown. fix ur shit, yo');
      }
      process.exit(1);
    }
    let fd = fs.openSync(fileName, 'w');
    response.on('data', chunk => {
      fs.write(fd, chunk, (err, written, buffer) => {
        if (err) {
          console.log(err + 'Write Error');
          process.exit(1);
        }
      });

      response.on('end', () => {
        fs.closeSync(fd);
        process.exit(0);
      });
    }).on('error', e => {
      console.log(e + 'get Error');
      process.exit(1);
    });
  });
};
