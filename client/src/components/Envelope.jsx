import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Envelope = ({ onOpen, senderName, senderPhoto }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(onOpen, 1000); // Wait for animation to finish before unmounting/hiding
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100 z-50 overflow-hidden">
            <div className="relative cursor-pointer group" onClick={handleOpen}>

                {/* Envelope Body */}
                <motion.div
                    layout
                    className="w-80 h-52 bg-rose-500 rounded-b-lg shadow-2xl relative z-20 flex items-center justify-center overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-white font-cursive text-2xl drop-shadow-md">
                        For You ❤️
                    </div>

                    {/* Animated Photo Card (Polaroid Style) */}
                    {senderPhoto && (
                        <motion.div
                            initial={{ y: 100, opacity: 0, rotate: -10 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                            className="absolute -bottom-24 bg-white p-3 rounded-lg shadow-2xl border-4 border-white transform hover:scale-105 transition-transform"
                        >
                            <img
                                src={senderPhoto}
                                alt={senderName}
                                className="w-32 h-32 object-cover rounded-md"
                            />
                            <p className="text-center mt-2 text-xs font-handwriting text-gray-700 font-semibold">
                                From: {senderName} 💕
                            </p>
                        </motion.div>
                    )}

                    {/* Fallback Badge if No Photo */}
                    {!senderPhoto && (
                        <div className="absolute -bottom-10 bg-white/80 px-4 py-2 rounded-full text-rose-600 font-bold shadow-md flex items-center gap-2">
                            <span>From: {senderName}</span>
                        </div>
                    )}
                </motion.div>

                {/* Envelope Flap (The Triangle) */}
                <motion.div
                    className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[110px] border-l-transparent border-r-transparent border-t-rose-600 z-30 origin-top"
                    initial={{ rotateX: 0 }}
                    animate={isOpen ? { rotateX: 180, zIndex: 10 } : { rotateX: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                {/* The Letter Inside */}
                <motion.div
                    className="absolute left-4 right-4 h-48 bg-white shadow-md z-10 flex flex-col items-center justify-center p-4 text-center rounded-sm"
                    initial={{ y: 0 }}
                    animate={isOpen ? { y: -100 } : { y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <p className="font-cursive text-xl text-rose-500 font-bold mb-1">A Special Surprise</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Tap to view</p>
                </motion.div>

            </div>

            <p className="absolute bottom-20 text-rose-400 animate-pulse text-sm font-medium">
                Tap the envelope to open!
            </p>
        </div>
    );
};

export default Envelope;
