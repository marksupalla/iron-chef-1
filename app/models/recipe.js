'use strict';

var Mongo = require('mongodb');

function Recipe(o){
  this.name        = (!o.name.trim().length) ? 'Oh Snap' : o.name;
  this.photo       = (!(o.photo.trim().length)) ? 'http://www.richardtimothy.com/wp-content/uploads/2012/08/31-wtf-look.png' : o.photo;
  this.directions  = o.directions || '1. You 2. Left 3. It 4. Blank!';
  this.ingredients = o.ingredients.split(',').map(function(i){return i.trim();});
  this.created     = new Date();
  this.category    = o.category;
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.all = function(cb){
  Recipe.collection.find().sort({created: -1}).toArray(cb);
};

Recipe.create = function(o, cb){
    var food = new Recipe(o);
    Recipe.collection.save(food, cb);
};

Recipe.deleteById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Recipe.collection.findAndRemove({_id:_id}, cb);
};


module.exports = Recipe;

