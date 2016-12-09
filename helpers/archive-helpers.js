var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var Promise = require('bluebird');

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

let readListOfUrls = function(cb) {
  fs.readFile(paths.list, (error, sites) => {
    if (error) { throw error; }
    sites = sites.toString().split('\n');
    cb ? cb(sites) : null;
  });
};

exports.readListOfUrls = Promise.promisify(readListOfUrls);

let isUrlInList = function(url, cb) {
  let urls = readListOfUrls((sites) => {
    let matched = false;
    sites.forEach((el, i) => {
      matched = el.match(url) ? true : matched;
    });
    cb(matched);
  });
};

exports.isUrlInList = Promise.promisify(isUrlInList);

exports.addUrlToList = Promise.promisify(function(url, cb) {
  fs.appendFile(paths.list, url + '\n', {encoding: 'utf8'}, () => {
    cb ? cb() : null;
  });
});

exports.isUrlArchived = isUrlArchived = Promise.promisify(function(url, cb) {
  fs.readdir(paths.archivedSites, (err, files) => {
    cb(files.indexOf(url) >= 0);
  });
});

exports.downloadUrls = downloadUrls = Promise.promisify(function(urls) {
  readListOfUrls((sites) => {
    sites.pop();
    _.each(sites, (site, index) => {
      let fixedSite = 'http://' + site;
      http.get(fixedSite, res => {
        let html = res.body;
        fs.writeFile(paths.archivedSites + '/' + site, html, err => {
          if (err) { throw err; }
          let newSites = sites.slice(index + 1).join('\n');
          console.log(newSites);

          fs.writeFile(paths.list, newSites, {encoding: 'utf8'}, (error) => {
            if (error) { throw error; }
          });
          console.log('File downloaded!');
        });
      });
    });
  });
});

// let currentUrls = readListOfUrls();
// downloadUrls(currentUrls);
