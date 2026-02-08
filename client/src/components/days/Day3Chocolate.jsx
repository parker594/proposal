import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Cookie } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import confetti from 'canvas-confetti';

const Day3Chocolate = ({ message }) => {
    const { id } = useParams();
    const [journeyData, setJourneyData] = useState(null);
    const [bitten, setBitten] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/journey/${id}`);
                setJourneyData(res.data);
            } catch (e) { console.error(e) }
        };
        fetchData();
    }, [id]);

    const handleBite = () => {
        setBitten(true);
        confetti({
            particleCount: 50,
            spread: 40,
            origin: { y: 0.6 },
            colors: ['#5D4037', '#8D6E63', '#D7CCC8']
        });
    };

    if (!journeyData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    const isOdia = journeyData.language === 'or';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative select-none bg-amber-50">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center z-10"
            >
                <h1 className="text-4xl font-cursive text-amber-800 mb-4 drop-shadow-sm">
                    {isOdia ? "ଶୁଭ ଚକୋଲେଟ୍ ଦିବସ! 🍫" : "Happy Chocolate Day! 🍫"}
                </h1>

                <div className="glass p-6 rounded-2xl max-w-sm mx-auto mb-8 border border-white/50 shadow-xl bg-white/40">
                    <p className="text-amber-900 text-lg italic leading-relaxed">
                        "{message || (isOdia ? "ତୁମେ ଚକୋଲେଟ୍ ଠାରୁ ଅଧିକ ମିଠା..." : "You are sweeter than chocolate...")}"
                    </p>
                    <div className="mt-4 text-sm font-bold text-amber-700 text-right">
                        - {journeyData.senderName}
                    </div>
                </div>

                <div className="h-64 flex items-center justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBite}
                        className="text-[10rem] leading-none filter drop-shadow-2xl transition-all"
                    >
                        {bitten ? "🍫" : "🍬"}
                    </motion.button>
                </div>

                <p className="text-amber-600/60 mt-4 animate-pulse font-medium">
                    {bitten
                        ? (isOdia ? "ଏତେ ସ୍ୱାଦିଷ୍ଟ! 😋" : "So Yummy! 😋")
                        : (isOdia ? "ଖାଇବା ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ" : "Tap to eat!")
                    }
                </p>

                {bitten && (
                    <button
                        onClick={() => {
                            const cleanNumber = journeyData.whatsappNumber?.replace(/\D/g, '');
                            if (cleanNumber) window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(isOdia ? "ଚକୋଲେଟ୍ ପାଇଁ ଧନ୍ୟବାଦ! 🍫" : "Thanks for the chocolates! 🍫")}`, '_blank');
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

export default Day3Chocolate;
