const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
  urlId: { type: String, required: true, unique: true },
  senderName: { type: String, required: true },
  receiverName: { type: String, required: true },
  language: { type: String, enum: ['en', 'or'], default: 'en' },
  messages: {
    day1: String, // Rose
    day2: String, // Propose
    day3: String, // Chocolate
    day4: String, // Teddy
    day5: String, // Promise
    day6: String, // Hug
    day7: String, // Kiss
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Journey', JourneySchema);
