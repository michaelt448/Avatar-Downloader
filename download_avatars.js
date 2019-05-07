var request = require('request');
var fs = require('fs');
require('dotenv').config();

var owner = process.argv[2];
var repo = process.argv[3];


console.log('Welcome to the GitHub Avatar Downloader!');

const getRepoContributors = function(repoOwner, repoName, cb) {
  if(repoOwner === undefined || repoName === undefined) {
    console.log('Please input both a repository and and repository name');
    return;
  }
  var options = {
   url : `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
   headers: {
    'User-Agent' : 'request',
    Authorization : process.env.GITHUB_TOKEN
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
  .pipe(fs.createWriteStream(filePath));
}


getRepoContributors(owner, repo, function(err,result) {
  console.log("Erros:", err);
  console.log("Donwloading...");
  result.forEach(function(person,index) {
    downloadImageByURL(person.avatar_url, `./avatars/${person.login}.jpg`);
    if (index === result.length - 1) {
      console.log('Download Complete');
    }
  });
});
