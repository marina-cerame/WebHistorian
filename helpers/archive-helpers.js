var fs = require('fs');
var path = require('path');
var _ = require('underscore');
// var dP = require('../workers/htmlfetcher');

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

exports.readListOfUrls = readListOfUrls = function() {
  let siteString = fs.readFileSync(paths.list);
  return siteString.toString().split('\n');
};

exports.isUrlInList = isUrlInList = function(url) {
  let urls = readListOfUrls();
  return _.contains(urls, url);
};

exports.addUrlToList = function(url) {
  if (!isUrlInList(url)) {
    let fd = fs.openSync(paths.list, 'a');
    fs.writeSync(fd, url + '\n');
    fs.closeSync(fd);
  }
};

exports.isUrlArchived = isUrlArchived = function(url) {
  let urls = fs.readdirSync(paths.archivedSites);
  return _.contains(urls, url);
};

exports.downloadUrls = downloadUrls = function(urls) {
  urls.forEach(function(url) {
    if (!isUrlArchived(url)) {
      // dP.downloadPage(paths.archivedSites + '/' + url, url);
    }
  });
};

let currentUrls = readListOfUrls();
downloadUrls(currentUrls);
