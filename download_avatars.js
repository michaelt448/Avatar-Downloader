var request = require('request');
var token = require('./secret');
var fs = require('fs');


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

const downloadImageByURL = function(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    // .on('response', function(response) {
    //   console.log('Response Status Code:', response.statusCode);
    // })

  .pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function(err,result) {
  console.log("Erros:", err);
  result.forEach(function(person) {
    downloadImageByURL(person.avatar_url, `./photos/${person.login}.jpg`);
  });
});