// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  var exphbs  = require('express-handlebars');

  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');   
  // GET route for getting all of the todos
  app.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.burgers.findAll({}).then(function(data) {
      // We have access to the todos as an argument inside of the callback function
    var hbsObject = {
      burgers: data
    };
    res.render('index', hbsObject);
    console.log(hbsObject);
    });
  });

  // POST route for saving a new todo
  app.post("/", function(req, res) {
    $.params({a: 4, c: 5}) 
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.burgers.create({
      burger_name: req.body.name
    }).then(function(data) {
      // We have access to the new todo as an argument inside of the callback function
      res.redirect("/");
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.post("/delete/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.burgers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.redirect("/");
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.post("/update/:id", function(req, res) {
    console.log("im here");
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.burgers.update({
      devoured: req.body.devoured
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.redirect("/");
    });
  });
};