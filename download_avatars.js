var request = require('request');
var token = require('./secret');
console.log('Welcome to the GitHub Avatar Downloader!');

const getRepoContributors = function(repoOwner, repoName, cb) {
  var options = {
   url : `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
   headers: {
    'User-Agent' : 'request',
    Authorization : 'token ' + token.GITHUB_TOKEN
   }
};
  request(options,function(err, res, body) {
    var data = JSON.parse(body);
    cb(err,data);
  });
}


getRepoContributors("jquery", "jquery", function(err,result) {
  console.log("Erros:", err);
  result.forEach(function(person) {
    console.log(person.login + ' is ' + person.avatar_url);
  });
});