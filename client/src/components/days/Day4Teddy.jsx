import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Gift } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Day4Teddy = ({ message }) => {
    const { id } = useParams();
    const [journeyData, setJourneyData] = useState(null);
    const [squeezed, setSqueezed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/journey/${id}`);
                setJourneyData(res.data);
            } catch (e) { console.error(e) }
        };
        fetchData();
    }, [id]);

    if (!journeyData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    const isOdia = journeyData.language === 'or';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative select-none bg-orange-50">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center z-10"
            >
                <h1 className="text-4xl font-cursive text-orange-600 mb-4 drop-shadow-sm">
                    {isOdia ? "ଶୁଭ ଟେଡି ଦିବସ! 🧸" : "Happy Teddy Day! 🧸"}
                </h1>

                <div className="glass p-6 rounded-2xl max-w-sm mx-auto mb-8 border border-white/50 shadow-xl bg-white/40">
                    <p className="text-orange-900 text-lg italic leading-relaxed">
                        "{message || (isOdia ? "ତୁମକୁ ଏକ ବଡ ଟେଡି ଆଲିଙ୍ଗନ ପଠାଉଛି!" : "Sending you a big soft teddy bear hug!")}"
                    </p>
                    <div className="mt-4 text-sm font-bold text-orange-600 text-right">
                        - {journeyData.senderName}
                    </div>
                </div>

                <div className="h-64 flex items-center justify-center">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setSqueezed(prev => !prev)}
                        className="text-[10rem] cursor-pointer drop-shadow-2xl select-none"
                    >
                        {squeezed ? "🥰" : "🧸"}
                    </motion.div>
                </div>

                <p className="text-orange-600/60 mt-4 animate-pulse font-medium">
                    {squeezed
                        ? (isOdia ? "ଓଃ ବହୁତ ନରମ! ☁️" : "Sooo soft! ☁️")
                        : (isOdia ? "ଟେଡିକୁ ଚିପିବା ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ" : "Tap to squeeze the teddy!")
                    }
                </p>

                {squeezed && (
                    <button
                        onClick={() => {
                            const cleanNumber = journeyData.whatsappNumber?.replace(/\D/g, '');
                            if (cleanNumber) window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(isOdia ? "ଟେଡି ବହୁତ କ୍ୟୁଟ୍! 🧸" : "The teddy is so cute! 🧸")}`, '_blank');
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

export default Day4Teddy;
