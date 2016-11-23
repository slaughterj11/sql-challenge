var promise = require('bluebird');

var options = {
 promiseLib: promise
};




var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);


exports.editPost = function (req, res, next) {
  db.none('update pups set title=$1, text=$2 where id=$3',
  [req.body.title, req.body.text, parseInt(req.params.id)])
  .then(function() {
  res.status(200)
  .json({ status: 'success' });
  }).catch(function (err) { return next(err); });
};


exports.deletePost = function (req, res) {
  var id = parseInt(req.params.id);
  db.result('delete from pups where id = $1', id)
  .then(function(result){
   res.status(200)
    .json({ message: 'Removed ${result.rowCount} post'}); })
     .catch(function (err) { return next(err); });
};



exports.post = function (req, res, next) {
  var id = parseInt(req.params.id);
  db.one('select * from pups where id = $1', id)
  .then(function (data){
  res.status(200)
  .json({
  post: data,
    });
    })
    .catch(function(err){
      return next(err);
    });
};

exports.posts = function (req, res, next) {
   db.any('select * from pups')
  .then(function (data) {
  res.status(200)
     .json({
      posts: data,
    });
    })
    .catch(function (err) {
    return next(err);
});
};





exports.addPost = function (req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into pups(title, text)' +
   'values(${title}, ${text})', req.body)
   .then(function(){
    res.status(200)
    .json({ status: 'success' });
     })
    .catch(function(err){
    return next(err);
     });
};



