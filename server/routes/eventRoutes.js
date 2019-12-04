var express = require('express');
var app = express();
var eventRoutes = express.Router();

// Require Item model in our routes module
var Event = require('../model/Event');

// Defined store route
eventRoutes.route('/add').post(function (req, res) {
  var event = new Event(req.body);
  console.log(event);
  console.log("TESTEANDO");
  console.log(req.body);
  event.save()
    .then(item => {
    res.status(200).json({'event': 'event added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

module.exports = eventRoutes;