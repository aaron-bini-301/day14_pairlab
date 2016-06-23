//IIFE - so this function is called immediately and the module is exported to the window
(function(module) {
  //empty repos object to hold our methods for this particular module
  var repos = {};

  //empty array which will at some point be populated with 'repos'
  repos.all = [];

  /* How does $.get() differ from $.getJSON() and $.ajax()? This is a shorthand ajax call which takes 4 parameters (url, data, success, and dataType). only the url is required.  */

  /* What happens due to the two chained $.done() functions? This is to ensure that our data gets to its view endpoint properly, so the first .done is for loading data into repos.all, and then when that is complete, subsequent things are done to that data*/

  /* How many .done callbacks run? Two of them run, one inside of each .done() method. If no callbacks run, why not? If the get request is not successful, probably these will not run. If one runs, which one runs, and what determines that? Maybe if the request is not succesful, the first .done() callback will not run but the second one will? not totally sure.
If both callbacks run, what order do they run in? Does that order ever change - if so, under what conditions? They always run in the same order, with the callback in the first .done() running first */

  /* a method that makes a GET request to the github API, which is actually routed with express in our server.js file through a proxy, and that proxy function sends our Github token for authentication. the data that is returned is set to repos.all, and then a callback is run when the request is done */
  repos.requestRepos = function(callback) {
    $.get('/github/user/repos' + '?per_page=100' + '&sort=updated')
    .done(function(data, message, xhr) { repos.all = data; })
    .done(callback);
  };
  /* our filtering function, which returns only repos with a certain attribute specified. repos.all is populated with an array of 'repo' objects from our github get request. they are filtered on a particular attribute of that object, so in this case, if our repo has an attr 'forks_count', or in other words if our repo has been forked, it will return that repo. filter loops through each repo, the repo in the filter methods anonymous function is the repo being filtered at that time. */
  repos.with = function(attr) {
    return repos.all.filter(function(repo) { return repo[attr]; });
  };

  //set our module to have a repos property
  module.repos = repos;
  //IIFE exports everythin to the window
})(window);
