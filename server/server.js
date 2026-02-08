require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Journey = require('./models/Journey');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Create a new Journey
app.post('/api/journey', async (req, res) => {
    try {
        const { senderName, receiverName, language, messages } = req.body;
        const urlId = crypto.randomBytes(4).toString('hex'); // 8 char unique ID

        // Validate messages structure if needed

        const newJourney = new Journey({
            urlId,
            senderName,
            receiverName,
            language,
            messages
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
