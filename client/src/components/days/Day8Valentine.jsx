import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Heart, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import confetti from 'canvas-confetti';

const Day8Valentine = ({ message }) => {
    const { id } = useParams();
    const [journeyData, setJourneyData] = useState(null);
    const [showLove, setShowLove] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/journey/${id}`);
                setJourneyData(res.data);
                // Trigger confetti on load for the grand finale
                setTimeout(() => {
                    confetti({
                        particleCount: 200,
                        spread: 100,
                        origin: { y: 0.6 },
                        colors: ['#FF0000', '#FF1493', '#FF69B4', '#FFFFFF']
                    });
                }, 1000);
            } catch (e) { console.error(e) }
        };
        fetchData();
    }, [id]);

    const handleWhatsApp = () => {
        if (!journeyData?.whatsappNumber) return;
        const cleanNumber = journeyData.whatsappNumber.replace(/\D/g, '');
        const text = journeyData.language === 'or'
            ? `ଶୁଭ ଭାଲେଣ୍ଟାଇନ୍ ଦିବସ! ❤️ ତୁମକୁ ବହୁତ ଭଲପାଏ!`
            : `Happy Valentine's Day! ❤️ I love you so much!`;
        window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
    };

    if (!journeyData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    const isOdia = journeyData.language === 'or';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative select-none bg-gradient-to-br from-rose-100 to-red-100">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center z-10 w-full max-w-lg"
            >
                <h1 className="text-5xl font-cursive text-red-600 mb-6 drop-shadow-md animate-pulse">
                    {isOdia ? "ଶୁଭ ଭାଲେଣ୍ଟାଇନ୍ ଦିବସ! ❤️" : "Happy Valentine's Day! ❤️"}
                </h1>

                <div className="glass p-8 rounded-3xl mx-auto mb-10 border-2 border-white/60 shadow-2xl bg-white/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-rose-500 to-red-400"></div>
                    <p className="text-red-900 text-xl italic leading-relaxed font-medium">
                        "{message || (isOdia ? "ତୁମେ ମୋ ଜୀବନର ସବୁଠାରୁ ବଡ ଉପହାର..." : "You are the best gift of my life...")}"
                    </p>
                    <div className="mt-6 text-base font-bold text-red-700 text-right flex items-center justify-end gap-2">
                        <span>- {journeyData.senderName}</span>
                        <Heart size={16} fill="currentColor" />
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWhatsApp}
                        className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-full shadow-xl flex items-center gap-3 transition-all w-full max-w-xs justify-center"
                    >
                        <MessageCircle size={24} />
                        <span>{isOdia ? "ହ୍ୱାଟ୍ସଆପ୍ ରେ ଉତ୍ତର ଦିଅନ୍ତୁ" : "Reply on WhatsApp"}</span>
                    </motion.button>

                    <p className="text-rose-400 text-xs mt-2 opacity-80">
                        {isOdia ? "ତୁମର ଭଲପାଇବା ପଠାନ୍ତୁ" : "Send your love back"}
                    </p>
                </div>

            </motion.div>

            {/* Attribution Footer */}
            <div className="fixed bottom-2 w-full text-center z-40 opacity-30 pointer-events-none">
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    Developed by Debajyoti Upadhayaya
                </p>
            </div>

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

export default Day8Valentine;
