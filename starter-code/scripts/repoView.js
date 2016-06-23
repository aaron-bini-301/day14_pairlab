//IIFE - so this is called immediately and attached to our window object
(function(module) {
  //empty object to hold our repoView methods
  var repoView = {};
  //a view function that resets the #about DOM element
  var ui = function() {
    var $about = $('#about'); // Best practice: Cache the DOM query if it's used more than once.

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  /* this function I believe was outputting repos using a Handlebars template, but it looks like today we're just returning a list item that contains an href to link to the repo on GitHub*/
  var render = function(repo) {
    return $('<li>')
      .html('<a href="' + repo.html_url + '">' + repo.full_name + '</a>');
  };

  /* ui is called to empty our DOM element with id='about', then the ul with #about is populated with our repo list items, but only those that pass our filter  */
  repoView.index = function() {
    ui();

    $('#about ul').append(
      repos.with('forks_count').map(render)
    );
  };


  module.repoView = repoView;
  //module exported to the window
})(window);
