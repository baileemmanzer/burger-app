var express = require("express");

var router = express.Router();

// Import the model burgers.js 
var burger = require("../models/burgers.js");

// Create all our routes and set up logic 
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.status(200).end();
  });
});

router.put("/api/burgers/:id", function(req, res) {
  burger.update('devoured', true, 'id', req.params.id, function(result){
        if(result.changedRows === 0 ){
            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function (req, res){
    var condition = "id = " + req.params.id;
    burger.delete(condition, function(result){
        if (result.affectedRows == 0) {
            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
});
// Exports routes for server.js to use
module.exports = router;