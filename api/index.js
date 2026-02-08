require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Journey = require('./models/Journey');
const crypto = require('crypto');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '2mb' })); // Increased limit for Base64 images
app.use(express.urlencoded({ limit: '2mb', extended: true }));

// MongoDB Connection (cached for serverless)
let isConnected = false;
const connectToDb = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

// Connect strictly before handling requests
app.use(async (req, res, next) => {
    await connectToDb();
    next();
});

// API Routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Create a new Journey
app.post('/api/journey', async (req, res) => {
    try {
        const { senderName, receiverName, language, whatsappNumber, customMessage, messages, activeDays, relationshipType, theme, targetDay, senderPhoto } = req.body;
        const urlId = crypto.randomBytes(4).toString('hex');

        console.log('Received senderPhoto:', !!senderPhoto, 'Length:', senderPhoto?.length);

        const newJourney = new Journey({
            urlId,
            senderName,
            receiverName,
            language,
            relationshipType,
            theme,
            whatsappNumber,
            customMessage,
            senderPhoto,
            messages,
            activeDays: activeDays || ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8'],
            targetDay: targetDay || 'all'
        });

        await newJourney.save();
        res.json({ success: true, urlId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get Journey by ID
app.get('/api/journey/:urlId', async (req, res) => {
    try {
        const journey = await Journey.findOne({ urlId: req.params.urlId });
        if (!journey) return res.status(404).json({ success: false, message: 'Journey not found' });
        res.json(journey);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// For local dev only
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
