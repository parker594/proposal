import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Day6Hug = ({ message }) => {
    const { id } = useParams();
    const [journeyData, setJourneyData] = useState(null);
    const [holding, setHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const controls = useAnimation();

    // Fetch journey data for language
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/journey/${id}`);
                setJourneyData(res.data);
            } catch (e) { console.error(e) }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        let interval;
        if (holding && !completed) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setCompleted(true);
                        return 100;
                    }
                    return prev + 2; // Adjust speed here (50 ticks = ~1-2s depending on interval)
                });
            }, 30);
        } else {
            if (!completed) setProgress(0);
        }
        return () => clearInterval(interval);
    }, [holding, completed]);

    // Arm animations
    const leftArmVar = {
        open: { x: -100, rotate: -20 },
        closed: { x: 0, rotate: 0 },
    };

    const rightArmVar = {
        open: { x: 100, rotate: 20 },
        closed: { x: 0, rotate: 0 },
    };

    const currentVariant = completed ? "closed" : (holding ? "closed" : "open");

    if (!journeyData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden select-none">
            <div className="relative w-full max-w-md h-96 flex items-center justify-center">

                {/* Left Arm */}
                <motion.div
                    variants={leftArmVar}
                    animate={currentVariant}
                    transition={{ duration: completed ? 0.5 : 2 }} // Slow close on hold
                    className="absolute left-0 w-1/3 h-12 bg-rose-400 rounded-r-full origin-left z-10 flex items-center justify-end pr-2"
                >
                    <span className="text-2xl">✋</span>
                </motion.div>

                {/* Right Arm */}
                <motion.div
                    variants={rightArmVar}
                    animate={currentVariant}
                    transition={{ duration: completed ? 0.5 : 2 }}
                    className="absolute right-0 w-1/3 h-12 bg-rose-400 rounded-l-full origin-right z-10 flex items-center justify-start pl-2"
                >
                    <span className="text-2xl">✋</span>
                </motion.div>

                {/* Center Body/Button */}
                <motion.button
                    className={`w-32 h-32 rounded-full flex items-center justify-center shadow-xl z-20 transition-colors duration-300 ${completed ? 'bg-rose-600' : 'bg-rose-500'}`}
                    onMouseDown={() => setHolding(true)}
                    onMouseUp={() => setHolding(false)}
                    onTouchStart={() => setHolding(true)}
                    onTouchEnd={() => setHolding(false)}
                    animate={completed ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                    whileTap={{ scale: 0.9 }}
                >
                    {completed ? (
                        <span className="text-4xl">🤗</span>
                    ) : (
                        <div className="text-center text-white font-bold">
                            {holding ? `${progress}%` : (journeyData.language === 'or' ? "ଧରି\nରଖ" : "HOLD\nME")}
                        </div>
                    )}
                </motion.button>
            </div>

            {completed && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 glass p-6 rounded-2xl max-w-md text-center"
                >
                    <h2 className="text-2xl font-cursive text-rose-700 mb-2">
                        {journeyData.language === 'or' ? 'ଗରମ ଆଲିଙ୍ଗନ!' : 'Warmest Hug!'}
                    </h2>
                    <p className="text-gray-700 italic">"{message}"</p>

                    <button
                        onClick={() => {
                            const cleanNumber = journeyData.whatsappNumber?.replace(/\D/g, '');
                            if (cleanNumber) window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(journeyData.language === 'or' ? "ଏକ ବଡ ଆଲିଙ୍ଗନ! 🤗" : "Sending a big hug back! 🤗")}`, '_blank');
                        }}
                        className="mt-4 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md inline-flex items-center gap-2"
                    >
                        <span>talk on whatsapp</span>
                    </button>
                </motion.div>
            )}

            {!completed && (
                <p className="mt-8 text-gray-500 animate-pulse">
                    {journeyData.language === 'or'
                        ? 'ଆଲିଙ୍ଗନ ପଠାଇବାକୁ ଧରି ରଖନ୍ତୁ...'
                        : 'Press and hold to send a hug...'
                    }
                </p>
            )}

            {/* Create Your Own Button */}
            <a
                href="/"
                className="fixed bottom-6 left-6 z-50 bg-white/80 hover:bg-white text-rose-600 px-4 py-3 rounded-full shadow-lg border border-white/50 backdrop-blur-sm font-semibold text-sm flex items-center gap-2 transition-transform hover:scale-105"
            >
                <PlusCircle size={20} />
                <span>Create Your Own</span>
            </a>
        </div>
    );
};

export default Day6Hug;
