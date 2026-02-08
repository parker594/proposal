import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Day2Propose from './components/days/Day2Propose';
import Day6Hug from './components/days/Day6Hug';
import FloatingHearts from './components/FloatingHearts';

// Wrapper to fetch Journey Data
const JourneyWrapper = ({ Component, dayKey }) => {
    const { id } = useParams();
    const [journey, setJourney] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJourney = async () => {
            try {
                const res = await axios.get(`/api/journey/${id}`);
                setJourney(res.data);
            } catch (err) {
                console.error("Failed to fetch journey", err);
            } finally {
                setLoading(false);
            }
        };
        fetchJourney();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-rose-500">Loading ❤️...</div>;
    if (!journey) return <div className="min-h-screen flex items-center justify-center text-gray-500">Journey not found 💔</div>;

    // If a specific day component is passed, render it with the specific message
    if (Component && dayKey) {
        return <Component message={journey.messages[dayKey]} />;
    }

    // Otherwise render Dashboard with journey data
    return <Dashboard journey={journey} />;
};

function App() {
    return (
        <Router>
            <FloatingHearts />
            <Routes>
                <Route path="/" element={<LandingPage />} />

                {/* Dynamic Routes for Journey */}
                <Route path="/v/:id" element={<JourneyWrapper Component={null} />} />

                {/* Day Routes */}
                <Route path="/v/:id/day/2" element={<JourneyWrapper Component={Day2Propose} dayKey="day2" />} />
                <Route path="/v/:id/day/6" element={<JourneyWrapper Component={Day6Hug} dayKey="day6" />} />

                {/* Placeholders for other days */}
                <Route path="/v/:id/day/1" element={<div className="min-h-screen flex items-center justify-center">🌹 Rose Day Coming Soon...</div>} />
                <Route path="/v/:id/day/3" element={<div className="min-h-screen flex items-center justify-center">🍫 Chocolate Day Coming Soon...</div>} />
                <Route path="/v/:id/day/4" element={<div className="min-h-screen flex items-center justify-center">🧸 Teddy Day Coming Soon...</div>} />
                <Route path="/v/:id/day/5" element={<div className="min-h-screen flex items-center justify-center">🤞 Promise Day Coming Soon...</div>} />
                <Route path="/v/:id/day/7" element={<div className="min-h-screen flex items-center justify-center">💋 Kiss Day Coming Soon...</div>} />

            </Routes>
        </Router>
    );
}

export default App;
