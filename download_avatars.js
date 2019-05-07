var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

const getRepoContributors = function(repoOwner, repoName, cb) {

}


getRepoContributors("jquery", "jquery", function(err,result) {
  console.log("Erros:", err);
  console.log("Result: ", result);
})