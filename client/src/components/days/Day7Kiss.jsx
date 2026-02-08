import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Heart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import confetti from 'canvas-confetti';

const Day7Kiss = ({ message }) => {
    const { id } = useParams();
    const [journeyData, setJourneyData] = useState(null);
    const [kissCount, setKissCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/journey/${id}`);
                setJourneyData(res.data);
            } catch (e) { console.error(e) }
        };
        fetchData();
    }, [id]);

    const handleKiss = (e) => {
        setKissCount(p => p + 1);

        // Shoot heart confetti from click position
        // Since we don't have click coords easily without event, we just center it or random
        confetti({
            particleCount: 20,
            spread: 30,
            startVelocity: 20,
            origin: {
                x: Math.random() * 0.4 + 0.3,
                y: Math.random() * 0.4 + 0.3
            },
            shapes: ['heart'],
            colors: ['#FFC0CB', '#FF1493', '#FF0000']
        });
    };

    if (!journeyData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    const isOdia = journeyData.language === 'or';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative select-none bg-red-50">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center z-10"
            >
                <h1 className="text-4xl font-cursive text-red-600 mb-4 drop-shadow-sm">
                    {isOdia ? "ଶୁଭ ଚୁମ୍ବନ ଦିବସ! 💋" : "Happy Kiss Day! 💋"}
                </h1>

                <div className="glass p-6 rounded-2xl max-w-sm mx-auto mb-8 border border-white/50 shadow-xl bg-white/40">
                    <p className="text-red-900 text-lg italic leading-relaxed">
                        "{message || (isOdia ? "ତୁମକୁ ବହୁତ ସାରା ଭଲପାଇବା ପଠାଉଛି..." : "Sending you lots of love...")}"
                    </p>
                    <div className="mt-4 text-sm font-bold text-red-600 text-right">
                        - {journeyData.senderName}
                    </div>
                </div>

                <div className="h-64 flex items-center justify-center relative">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleKiss}
                        className="text-[8rem] filter drop-shadow-2xl active:scale-95 transition-transform"
                    >
                        💋
                    </motion.button>

                    {/* Floating hearts based on count logic could go here, but confetti does the job well */}
                </div>

                <p className="text-red-500 font-bold mt-2 text-xl">
                    {kissCount > 0 ? `${kissCount} 😘` : ""}
                </p>

                <p className="text-red-400 text-sm animate-pulse mt-2">
                    {isOdia ? "ଚୁମ୍ବନ ପଠାଇବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ!" : "Tap to send kisses!"}
                </p>

                {kissCount > 0 && (
                    <button
                        onClick={() => {
                            const cleanNumber = journeyData.whatsappNumber?.replace(/\D/g, '');
                            if (cleanNumber) window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(isOdia ? "ବହୁତ ସାରା ଚୁମ୍ବନ! 💋" : "Sending kisses back! 💋")}`, '_blank');
                        }}
                        className="mt-6 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md flex items-center gap-2"
                    >
                        <span>talk on whatsapp</span>
                    </button>
                )}

            </motion.div>

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

export default Day7Kiss;
