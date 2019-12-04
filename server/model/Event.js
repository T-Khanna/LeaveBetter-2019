var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Event = new Schema({
  startDate: {
    type: Date
  },
  EndDate: {
    type: Date
  },
  personId: {
    type: String
  },
  category: {
    type: String
  }
},{
    collection: 'ootoevents'
});

module.exports = mongoose.model('Event', Event);