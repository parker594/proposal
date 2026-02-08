import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';

const rejectionsEnglish = [
    "No 🥺",
    "Are you sure?",
    "Really sure?",
    "Don't do this! 💔",
    "I'm gonna cry... 😭",
    "Just click Yes!",
    "Please? 🥺",
    "Don't be mean!",
    "Have a heart!",
    "I'll buy you food! 🍔",
    "Last chance! ⚠️"
];

const rejectionsOdia = [
    "ନା 🥺",
    "ତୁମେ ନିଶ୍ଚିତ କି?",
    "ପକ୍କା ନିଶ୍ଚିତ?",
    "ଏମିତି କର ନାହିଁ! 💔",
    "ମୁଁ କାନ୍ଦିବି... 😭",
    "କେବଳ ହଁ କୁହ!",
    "ଦୟାକରି? 🥺",
    "ଖରାପ ହୁଅ ନାହିଁ!",
    "ହୃଦୟ ରଖ!",
    "ମୁଁ ତୁମକୁ ଖାଦ୍ୟ କିଣିଦେବି! 🍔",
    "ଶେଷ ସୁଯୋଗ! ⚠️"
];

const Day2Propose = ({ message }) => {
    const { id } = useParams();
    const [journeyData, setJourneyData] = useState(null);

    const [noCount, setNoCount] = useState(0);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [accepted, setAccepted] = useState(false);
    const [emoji, setEmoji] = useState("🐻");
    const [mainQuestion, setMainQuestion] = useState("Will you go out with me?");

    // Fetch full journey data to get custom fields
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/journey/${id}`);
                setJourneyData(res.data);
                // Set initial question based on language
                const question = res.data.language === 'or'
                    ? `${res.data.receiverName}, ତୁମେ ମୋର ସବୁଦିନ ପାଇଁ ହେବ?`
                    : `${res.data.receiverName}, will you be mine forever?`;
                setMainQuestion(question);
            } catch (e) { console.error(e) }
        };
        fetchData();
    }, [id]);

    const handleNo = () => {
        const newCount = noCount + 1;
        setNoCount(newCount);

        // Select the right rejection array based on language
        const rejections = journeyData?.language === 'or' ? rejectionsOdia : rejectionsEnglish;

        // 1. Change Text
        if (newCount < rejections.length) {
            setMainQuestion(rejections[newCount]);
        } else {
            setMainQuestion(journeyData?.language === 'or'
                ? "ଠିକ ଅଛି, ମୁଁ ବର୍ତ୍ତମାନ ତୁମର 'ନା' କୁ ଅଣଦେଖା କରୁଛି। 😂"
                : "Okay, I'm ignoring your 'No' now. 😂"
            );
        }

        // 2. Change Emoji
        if (newCount === 1) setEmoji("🥺");
        if (newCount === 3) setEmoji("😢");
        if (newCount === 5) setEmoji("😭");
        if (newCount === 7) setEmoji("😤");

        // 3. Move Button (The Runaway Logic)
        // We use Fixed position to let it roam the entire screen freely
        const randomX = Math.random() * (window.innerWidth - 100) - (window.innerWidth / 2 - 50);
        const randomY = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50);
        setNoButtonPosition({ x: randomX, y: randomY });
    };

    const handleYes = () => {
        setAccepted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
        });
    };

    const sendWhatsApp = () => {
        if (!journeyData?.whatsappNumber) return;

        // Sanitize number: remove non-digit characters (spaces, dashes, parens)
        const cleanNumber = journeyData.whatsappNumber.replace(/\D/g, '');

        const text = `Hey ${journeyData.senderName}! I saw your proposal... and I said YES! ❤️`;
        const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    if (!journeyData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative select-none">
            {!accepted ? (
                <div className="glass p-8 rounded-3xl max-w-md text-center w-full z-10 relative transition-transform duration-100">
                    <div className="text-6xl mb-4 animate-bounce">{emoji}</div>

                    {journeyData.customMessage && (
                        <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-4 mb-6 rounded text-sm italic">
                            "{journeyData.customMessage}"
                        </div>
                    )}

                    <h1 className="text-3xl font-cursive text-rose-600 mb-8 min-h-[80px] flex items-center justify-center">
                        {mainQuestion}
                    </h1>

                    <div className="flex justify-center items-center gap-6 h-20 relative">
                        <button
                            onClick={handleYes}
                            style={{ transform: `scale(${1 + noCount * 0.1})` }}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-200 z-20"
                        >
                            Yes! ❤️
                        </button>

                        {/* The Runaway Button */}
                        <motion.button
                            onClick={handleNo}
                            onHoverStart={() => {
                                // Initial slight move on hover to warn user
                                if (noCount > 0) handleNo();
                            }}
                            animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-full absolute"
                            style={{
                                left: '55%', // Initial offset
                            }}
                        >
                            No
                        </motion.button>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass p-8 rounded-3xl max-w-md text-center border-4 border-rose-300"
                >
                    <div className="text-6xl mb-4">✨💑✨</div>

                    <div className="text-2xl font-cursive text-rose-600 mb-6 leading-relaxed">
                        {journeyData.language === 'or'
                            ? `"ପ୍ରତ୍ୟେକ ପ୍ରେମ କାହାଣୀ ସୁନ୍ଦର,\nକିନ୍ତୁ ଆମର କାହାଣୀ ମୋର ପ୍ରିୟ।"`
                            : `"Every love story is beautiful,\nbut ours is my favorite."`
                        }
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">
                        {journeyData.language === 'or'
                            ? `${journeyData.senderName}କୁ ବର୍ତ୍ତମାନ କୁହନ୍ତୁ:`
                            : `Tell ${journeyData.senderName} now:`
                        }
                    </p>

                    <button
                        onClick={sendWhatsApp}
                        className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2 w-full"
                    >
                        <MessageCircle size={20} /> Send "Yes" on WhatsApp 💬
                    </button>
                </motion.div>
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

// Simple icon component for cleaner code inside
const MessageCircle = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

export default Day2Propose;
