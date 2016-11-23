

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');

var app = module.exports = express.createServer();



app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


app.get('/', routes.index);
app.get('/partials/:name', routes.partials);


app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

app.get('*', routes.index);

app.listen(3005, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
