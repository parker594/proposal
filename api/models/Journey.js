const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
    urlId: { type: String, required: true, unique: true },
    senderName: { type: String, required: true },
    receiverName: { type: String, required: true },
    language: { type: String, enum: ['en', 'or'], default: 'en' },
    relationshipType: { type: String, default: 'partner' }, // crush, partner, friend
    theme: { type: String, default: 'rose' }, // rose, purple, red
    whatsappNumber: { type: String },
    customMessage: { type: String }, // General custom message
    senderPhoto: { type: String }, // Base64 encoded image
    activeDays: { type: [String], default: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8'] },
    targetDay: { type: String, default: 'all' }, // 'all' or 'day1', 'day2' etc.
    messages: {
        day1: String, // Rose
        day2: String, // Propose
        day3: String, // Chocolate
        day4: String, // Teddy
        day5: String, // Promise
        day6: String, // Hug
        day7: String, // Kiss
        day8: String, // Valentine
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Journey', JourneySchema);
