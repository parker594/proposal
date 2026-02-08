import React, { useState } from 'react';
import { Heart, Flower, Gift, Cookie, User, Smile, ShieldCheck, PlusCircle, Loader2, ArrowLeft } from 'lucide-react';
import Envelope from './Envelope';
import Day2Propose from './days/Day2Propose';
import Day6Hug from './days/Day6Hug';
import Day1Rose from './days/Day1Rose';
import Day3Chocolate from './days/Day3Chocolate';
import Day4Teddy from './days/Day4Teddy';
import Day5Promise from './days/Day5Promise';
import Day7Kiss from './days/Day7Kiss';
import Day8Valentine from './days/Day8Valentine';

// Placeholder Components for missing days
const DayPlaceholder = ({ name, icon: Icon, color }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-rose-50 text-center relative">
        <Icon className={`w-20 h-20 ${color} mb-4 animate-bounce`} />
        <h2 className="text-3xl font-cursive font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-500">Coming soon / Not customized yet! 💖</p>

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

const Dashboard = ({ journey }) => {
    const { messages, language, receiverName, senderName, activeDays, theme, relationshipType, targetDay } = journey;
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

    // Theme configuration
    const themes = {
        rose: { bg: 'from-pink-50 to-rose-100', text: 'text-rose-600', icon: 'text-rose-500' },
        purple: { bg: 'from-purple-50 to-indigo-100', text: 'text-purple-600', icon: 'text-purple-500' },
        red: { bg: 'from-red-50 to-red-100', text: 'text-red-600', icon: 'text-red-500' }
    };

    const currentTheme = themes[theme] || themes.rose;

    // Direct Day Rendering Logic
    // If targetDay matches a known day, we render that component DIRECTLY instead of the grid.
    // Direct Rendering Logic handled at return.


    const allDays = [
        { id: 'day1', name: 'Rose', icon: Flower, path: '/day/1', color: 'text-red-500' },
        { id: 'day2', name: 'Propose', icon: User, path: '/day/2', color: 'text-pink-600' },
        { id: 'day3', name: 'Chocolate', icon: Cookie, path: '/day/3', color: 'text-yellow-700' },
        { id: 'day4', name: 'Teddy', icon: Gift, path: '/day/4', color: 'text-orange-400' },
        { id: 'day5', name: 'Promise', icon: ShieldCheck, path: '/day/5', color: 'text-blue-500' },
        { id: 'day6', name: 'Hug', icon: Smile, path: '/day/6', color: 'text-green-500' },
        { id: 'day7', name: 'Kiss', icon: Heart, path: '/day/7', color: 'text-red-600' },
    ];

    const filteredDays = activeDays
        ? allDays.filter(day => activeDays.includes(day.id))
        : allDays;

    const getGreeting = () => {
        let title = receiverName;
        if (relationshipType === 'crush') title = `My Crush, ${receiverName}`;
        if (relationshipType === 'partner') title = `My Love, ${receiverName}`;
        if (relationshipType === 'friend') title = `Bestie ${receiverName}`;

        return language === 'or' ? `Namaste, ${title}` : `Hello, ${title}`;
    };

    if (!isEnvelopeOpen) {
        return <Envelope senderName={senderName} onOpen={() => setIsEnvelopeOpen(true)} />;
    }

    // --- STRICT SINGLE DAY VIEW ---
    // We default to 'day1' (Rose Day) if targetDay is missing or 'all' to prevent errors.
    const dayToShow = (targetDay && targetDay !== 'all') ? targetDay : 'day1';

    switch (dayToShow) {
        case 'day1': return <><Day1Rose message={messages?.day1} /><FooterCredit /></>;
        case 'day2': return <><Day2Propose message={messages?.day2} /><FooterCredit /></>;
        case 'day3': return <><Day3Chocolate message={messages?.day3} /><FooterCredit /></>;
        case 'day4': return <><Day4Teddy message={messages?.day4} /><FooterCredit /></>;
        case 'day5': return <><Day5Promise message={messages?.day5} /><FooterCredit /></>;
        case 'day6': return <><Day6Hug message={messages?.day6} /><FooterCredit /></>;
        case 'day7': return <><Day7Kiss message={messages?.day7} /><FooterCredit /></>;
        case 'day8': return <><Day8Valentine message={messages?.day8} /><FooterCredit /></>;
        default: return <><Day1Rose message={messages?.day1} /><FooterCredit /></>;
    }
};

const FooterCredit = () => (
    <div className="fixed bottom-2 w-full text-center z-40 opacity-30 pointer-events-none">
        <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
            Developed by Debajyoti Upadhayaya
        </p>
    </div>
);

export default Dashboard;
