import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Flower } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import confetti from 'canvas-confetti';

const Day1Rose = ({ message }) => {
    const { id } = useParams();
    const [journeyData, setJourneyData] = useState(null);
    const [showFlower, setShowFlower] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/journey/${id}`);
                setJourneyData(res.data);
            } catch (e) { console.error(e) }
        };
        fetchData();
    }, [id]);

    const handleGiveRose = () => {
        setShowFlower(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ff69b4', '#00ff00']
        });
    };

    if (!journeyData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const isOdia = journeyData.language === 'or';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative select-none bg-rose-50">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center z-10"
            >
                <h1 className="text-4xl font-cursive text-rose-600 mb-4 drop-shadow-sm">
                    {isOdia ? "ଶୁଭ ଗୋଲାପ ଦିବସ! 🌹" : "Happy Rose Day! 🌹"}
                </h1>

                <div className="glass p-6 rounded-2xl max-w-sm mx-auto mb-8 border border-white/50 shadow-xl">
                    <p className="text-gray-700 text-lg italic leading-relaxed">
                        "{message || (isOdia ? "ଏହି ଗୋଲାପଟି ତୁମ ପାଇଁ..." : "This rose is for you...")}"
                    </p>
                    <div className="mt-4 text-sm font-bold text-rose-500 text-right">
                        - {journeyData.senderName}
                    </div>
                </div>

                <div className="h-64 flex items-center justify-center relative">
                    {!showFlower ? (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleGiveRose}
                            className="bg-rose-500 text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-2"
                        >
                            <Flower size={24} />
                            {isOdia ? "ଗୋଲାପ ନିଅନ୍ତୁ" : "Accept Rose"}
                        </motion.button>
                    ) : (
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1.5, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <div className="text-[10rem] drop-shadow-2xl filter hover:brightness-110 transition-all cursor-pointer" onClick={() => confetti()}>
                                🌹
                            </div>
                        </motion.div>
                    )}
                </div>

                {showFlower && (
                    <div className="flex flex-col items-center gap-4 mt-8">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-rose-600 font-medium"
                        >
                            {isOdia ? "ମୋର ଭାଲେଣ୍ଟାଇନ୍!" : "For my lovely Valentine!"}
                        </motion.p>

                        <button
                            onClick={() => {
                                const cleanNumber = journeyData.whatsappNumber?.replace(/\D/g, '');
                                if (cleanNumber) window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(isOdia ? "ଧନ୍ୟବାଦ ଗୋଲାପ ପାଇଁ! 🌹" : "Thanks for the beautiful rose! 🌹")}`, '_blank');
                            }}
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md flex items-center gap-2"
                        >
                            <span>talk on whatsapp</span>
                        </button>
                    </div>
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

export default Day1Rose;
