// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var questionSchema = new Schema({
  question: { type: String, required: true, unique: true },
  answer: { type: String, required: true },
  wrongAnswers: [],
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Question = mongoose.model('Question', questionSchema);

// make this available to our users in our Node applications
module.exports = Question;
