//IIFE - executed immediately, and attached to window object
(function(module) {
  //empty object to hold our about controller methods
  var aboutController = {};
  /* wrapper function for the meaty repos.requestRepos(repoView.index) that basically does everything to get our repos on the screen */
  aboutController.index = function() {
    repos.requestRepos(repoView.index);
  };
  //modules aboutController property is set to our aboutController object which has our methods
  module.aboutController = aboutController;
//export our module to the window
})(window);
