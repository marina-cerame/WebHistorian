var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(cb) {
  fs.readFile(paths.list, (error, sites) => {
    if (error) { throw error; }
    sites = sites.toString().split('\n');
    cb ? cb(sites) : null;
  });
};

exports.isUrlInList = isUrlInList = function(url, cb) {
  let urls = readListOfUrls((sites) => {
    let matched = false;
    sites.forEach((el, i) => {
      matched = el.match(url) ? true : matched;
    });
    cb(matched);
  });
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(paths.list, url + '\n', {encoding: 'utf8'}, () => {
    cb ? cb() : null;
  });
};

exports.isUrlArchived = isUrlArchived = function(url, cb) {
  fs.readdir(paths.archivedSites, (err, files) => {
    cb(files.indexOf(url) >= 0);
  });
};

exports.downloadUrls = downloadUrls = function(urls) {
  // readListOfUrls((sites) => {
  //   _.each(sites, site => {
  //     http.get(site, res => {
  //       let html = res.body;
  //       fs.writeFile(paths.archivedSites + '/' + site, html, err => {
  //         if (err) { throw err; }
  //         console.log('File downloaded!');
  //       });
  //       // maybe someday come back and remove downloaded files from the queue but NOT TODAY.
  //     });
  //   });
  // });
};

let currentUrls = readListOfUrls();
downloadUrls(currentUrls);
