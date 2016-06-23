/*Comment: Our home route. Two callback functions run when we route to our home page.
  articlesController.loadAll runs first, as it is the first callback listed.
  Within articlesController.loadAll, next(); is called, and this refers to the second function
  listed here, which is articlesController.index. */
page('/',
  articlesController.loadAll,
  articlesController.index);

/* this one seems simple at first glance but there is a lot going on here; layer 1: we navigate to about
  and aboutController.index is called. aboutController.index is basically a wrapper for repos.requestRepos(repoView.index); repos.requestRepos is a wrapper for an ajax call which specifies /github/user/repos as the url. If you then go into server.js, express is running routing in our app that says anytime /github/* is called  (which means /github/ with anything after it in the routename), run this callback function called proxyGitHub. This is our proxy call to the GitHub API, where we finally make the actual GET request off of our domain to GitHub. repos.all is then set to the data that is returned, in this case an array of 'repo objects' from GitHub. Finally repoView.index is called as the callback in repos.requestRepos which is our final function that controls view and manipulates the DOM to show our repos on the page.*/
page('/about', aboutController.index);

/*  in this call, what is input into the url after /article/ will be equal to ctx.params.id, which will be used inside of our callbacks specified here. the pairlab addressed what these functions are doing, so I don't particularly want to re-list what we covered there. But as a summary, articlesController.loadById queries our database and returns the article specified with ctx.params.id, and then that article is loaded into the DOM with articlesController.index */
page('/article/:id',
  articlesController.loadById,
  articlesController.index);

// Redirect home if the default filter option is selected:
page('/category', '/');
page('/author', '/');

/*  this is very similar to the /article/:id route above, and again we covered this in the pairlab. As a summary, whatever follows /author/ here will be set to ctx.params.authorName. Forgot to mention, ctx is a page.js object that can be used and passed around to share state and hold bits of data to be used in our functions. so the author name is used to query our database and articles by that particular author are returned, and then again, articlesController.index is passed this data and used to manipulate the DOM as our view function. also this is called when the author select is changed (the 'onchange' event) */
page('/author/:authorName',
  articlesController.loadByAuthor,
  articlesController.index);

//same as above, the value for :categoryName becomes ctx.params.categoryName, and this is used to query the database in order to return only the articles in that particular category. Again, articleController.index is called as the second callback in order to output those articles on our main page.
page('/category/:categoryName',
  articlesController.loadByCategory,
  articlesController.index);

//initiate our page.js routing
page();
