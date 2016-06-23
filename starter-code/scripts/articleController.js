(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };
    /* this rticleContoller.js (likely the hardest part of this lab)
      In detail, explain how .findWhere() works, and how the call in line 27 works. Explain where the authorName part of ctx.params.authorName.replace('+', ' ') comes from.
      Explain how these are related (+1 E.C.)
      The page() call in routes.js:15
      The parameter ctx in lines 6, 7, 21, & 23. Note: You can read this to learn about the purpose and usage of ctx.

      this function initiates a SQL Query, asking our database to SELECT all FROM articles WHERE author = ctx.params.authorName, where the whitespace in the author name is replaced with a +. In this function, authorData is specified as the callback, and WebSQL returns the data that was requested and passes it as a parameter to our callback function authorData. So, the parameter articlesByAuthor in our function is populated with the data from the sql query and then ctx.articles is set equal to that data. then, next() is called in authorData, which if you look at page.js is articlesController.index, and that function is basically our final view function.
      This is related to the page.js route on line 15 in that it is simply a different sql query that runs as a filter for what is output on the screen, the same view function is called in both cases.
      ctx is a page.js object. you can set properties on that object in order to pass around data in our functions. also things following a colon in our routes, like :id, will be populated with a value when the route is requested, like so: if this is our route: articles/:id, and this is requested: articles/01, ctx.params.id will equal '01'
    */
    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
