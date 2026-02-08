import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, ShieldCheck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Day5Promise = ({ message }) => {
    const { id } = useParams();
    const [journeyData, setJourneyData] = useState(null);
    const [promised, setPromised] = useState(false);

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
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative select-none bg-blue-50">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center z-10"
            >
                <h1 className="text-4xl font-cursive text-blue-600 mb-4 drop-shadow-sm">
                    {isOdia ? "ଶୁଭ ପ୍ରତିଜ୍ଞା ଦିବସ! 🤝" : "Happy Promise Day! 🤝"}
                </h1>

                <div className="glass p-6 rounded-2xl max-w-sm mx-auto mb-8 border border-white/50 shadow-xl bg-white/40">
                    <p className="text-blue-900 text-lg italic leading-relaxed">
                        "{message || (isOdia ? "ମୁଁ ସବୁଦିନ ତୁମ ସହିତ ରହିବାକୁ ପ୍ରତିଜ୍ଞା କରୁଛି..." : "I promise to be with you forever...")}"
                    </p>
                    <div className="mt-4 text-sm font-bold text-blue-600 text-right">
                        - {journeyData.senderName}
                    </div>
                </div>

                <div className="h-48 flex items-center justify-center">
                    <motion.div
                        className="relative cursor-pointer"
                        onClick={() => setPromised(true)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ShieldCheck
                            size={120}
                            className={`transition-all duration-500 ${promised ? 'text-blue-500' : 'text-gray-300'}`}
                        />
                        {promised && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center text-white text-6xl"
                            >
                                ✨
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                <p className="text-blue-600/60 mt-4 font-medium h-6">
                    {promised
                        ? (isOdia ? "ପ୍ରତିଜ୍ଞା ରକ୍ଷା କରାଗଲା! 🔒" : "Promise Sealed! 🔒")
                        : (isOdia ? "ପ୍ରତିଜ୍ଞା କରିବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ" : "Tap to seal the promise")
                    }
                </p>

                {promised && (
                    <button
                        onClick={() => {
                            const cleanNumber = journeyData.whatsappNumber?.replace(/\D/g, '');
                            if (cleanNumber) window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(isOdia ? "ମୁଁ ମଧ୍ୟ ପ୍ରତିଜ୍ଞା କରୁଛି! 🤝" : "I promise too! 🤝")}`, '_blank');
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

export default Day5Promise;
