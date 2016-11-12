// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
  Answer is located at choices[answer]
 */
var questionSchema = new Schema({
  question: { type: String, required: true, unique: true },
  answer: { type: Number, required: true },
  choices: [],
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Question = mongoose.model('Question', questionSchema);

// make this available to our users in our Node applications
module.exports = Question;
