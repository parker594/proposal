import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Link as LinkIcon, Copy, Loader2, MessageCircle, Settings, Check, Palette, Users } from 'lucide-react';
import { quotes } from '../data/quotes';

const LandingPage = () => {
    const [formData, setFormData] = useState({
        senderName: '',
        receiverName: '',
        whatsappNumber: '',
        customMessage: '',
        language: 'en',
        vibe: 'emotional',
        relationshipType: 'partner', // crush, partner, friend
        theme: 'rose', // rose, purple, red
        targetDay: 'day1' // Default to Rose Day
    });

    // Customization State
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [activeDays, setActiveDays] = useState(['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7']);
    const [customMessages, setCustomMessages] = useState({});

    const [loading, setLoading] = useState(false);
    const [generatedLink, setGeneratedLink] = useState(null);
    const [senderPhoto, setSenderPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const daysList = [
        { id: 'day1', name: 'Rose Day 🌹' },
        { id: 'day2', name: 'Propose Day 💍' },
        { id: 'day3', name: 'Chocolate Day 🍫' },
        { id: 'day4', name: 'Teddy Day 🧸' },
        { id: 'day5', name: 'Promise Day 🤝' },
        { id: 'day6', name: 'Hug Day 🤗' },
        { id: 'day7', name: 'Kiss Day 💋' },
        { id: 'day8', name: "Valentine's Day ❤️" }
    ];

    useEffect(() => {
        if (!isCustomizing) {
            const defaults = quotes[formData.language][formData.vibe];
            setCustomMessages(defaults);
        }
    }, [formData.language, formData.vibe, isCustomizing]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDayToggle = (dayId) => {
        if (activeDays.includes(dayId)) {
            setActiveDays(activeDays.filter(d => d !== dayId));
        } else {
            setActiveDays([...activeDays, dayId]);
        }
    };

    const handleMessageChange = (dayId, text) => {
        setCustomMessages(prev => ({ ...prev, [dayId]: text }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
            const reader = new FileReader();
            reader.onloadend = () => {
                setSenderPhoto(reader.result);
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image under 2MB');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                messages: customMessages,
                activeDays: activeDays,
                senderPhoto: senderPhoto
            };

            console.log('Sending payload:', {
                hasSenderPhoto: !!senderPhoto,
                photoLength: senderPhoto?.length
            });

            const res = await axios.post('/api/journey', payload);
            const link = `${window.location.origin}/v/${res.data.urlId}`;
            setGeneratedLink(link);
        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        alert('Link Copied! 💖');
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br ${formData.theme === 'rose' ? 'from-pink-100 to-rose-200' : formData.theme === 'purple' ? 'from-purple-100 to-indigo-200' : 'from-red-100 to-red-200'}`}>
            <div className="glass p-8 rounded-3xl w-full max-w-2xl shadow-2xl border border-white/50 my-10">

                {!generatedLink ? (
                    <>
                        <div className="flex justify-center mb-6">
                            <Heart className={`w-16 h-16 animate-pulse drop-shadow-lg ${formData.theme === 'rose' ? 'text-rose-600' : formData.theme === 'purple' ? 'text-purple-600' : 'text-red-600'}`} fill="currentColor" />
                        </div>
                        <h2 className={`text-4xl font-cursive font-bold text-center mb-2 ${formData.theme === 'rose' ? 'text-rose-700' : formData.theme === 'purple' ? 'text-purple-700' : 'text-red-700'}`}>
                            Proposal Maker 💖
                        </h2>
                        <p className="text-center text-gray-600 mb-6 text-sm">Design 'Her Choice' Valentine Journey</p>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Your Name</label>
                                        <input
                                            type="text"
                                            name="senderName"
                                            placeholder="e.g. Rahul"
                                            required
                                            className="w-full p-3 rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/70"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Receiver Name</label>
                                        <input
                                            type="text"
                                            name="receiverName"
                                            placeholder="e.g. Priya"
                                            required
                                            className="w-full p-3 rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/70"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1 flex items-center gap-1">
                                        <MessageCircle size={14} /> Your WhatsApp Number
                                    </label>
                                    <input
                                        type="text"
                                        name="whatsappNumber"
                                        placeholder="e.g. 919876543210"
                                        required
                                        className="w-full p-3 rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/70"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Photo Upload */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                                        📸 Your Photo (Optional, Max 2MB)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="w-full p-2 text-sm rounded-xl border border-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                                    />
                                    {photoPreview && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <img src={photoPreview} alt="Preview" className="w-12 h-12 rounded-full object-cover border-2 border-rose-300" />
                                            <span className="text-xs text-green-600">✓ Photo uploaded</span>
                                        </div>
                                    )}
                                </div>

                                {/* New Customization Options */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1 flex items-center gap-1"><Users size={14} /> Relationship</label>
                                        <select name="relationshipType" onChange={handleChange} className="w-full p-3 rounded-xl border border-white/40 focus:ring-2 focus:ring-rose-400 bg-white/70">
                                            <option value="partner">Partner 💑</option>
                                            <option value="crush">Crush 🙈</option>
                                            <option value="friend">Bestie 👯‍♀️</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1 flex items-center gap-1"><Palette size={14} /> Theme Color</label>
                                        <select name="theme" onChange={handleChange} className="w-full p-3 rounded-xl border border-white/40 focus:ring-2 focus:ring-rose-400 bg-white/70">
                                            <option value="rose">Soft Rose 🌸</option>
                                            <option value="purple">Dreamy Purple 💜</option>
                                            <option value="red">Passion Red ❤️</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Select The Day to Send</label>
                                    <select name="targetDay" onChange={handleChange} className="w-full p-3 rounded-xl border border-white/40 focus:ring-2 focus:ring-rose-400 bg-white/70">
                                        {daysList.map(day => (
                                            <option key={day.id} value={day.id}>{day.name}</option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">The link will open this specific day directly!</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Language</label>
                                        <select name="language" onChange={handleChange} value={formData.language} className="w-full p-3 rounded-xl border border-white/40 bg-white/70">
                                            <option value="en">English</option>
                                            <option value="or">Odia</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Vibe</label>
                                        <select name="vibe" onChange={handleChange} value={formData.vibe} className="w-full p-3 rounded-xl border border-white/40 bg-white/70">
                                            <option value="emotional">Emotional 💖</option>
                                            <option value="savage">Savage 😎</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Advanced */}
                            <div className="flex items-center justify-between bg-white/40 p-3 rounded-xl border border-white/30">
                                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Settings size={16} /> Customize Days & Messages?
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsCustomizing(!isCustomizing)}
                                    className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${isCustomizing ? 'bg-rose-500' : 'bg-gray-300'}`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-md absolute top-1 transition-all duration-300 ${isCustomizing ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>

                            {isCustomizing && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                    {daysList.map((day) => (
                                        <div key={day.id} className={`p-3 rounded-xl border transition-all ${activeDays.includes(day.id) ? 'bg-white/60 border-rose-200' : 'bg-gray-100/50 border-gray-200 opacity-60'}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <div
                                                        onClick={() => handleDayToggle(day.id)}
                                                        className={`w-5 h-5 rounded flex items-center justify-center border ${activeDays.includes(day.id) ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-gray-400'}`}
                                                    >
                                                        {activeDays.includes(day.id) && <Check size={12} strokeWidth={4} />}
                                                    </div>
                                                    <span className={`font-bold ${activeDays.includes(day.id) ? 'text-gray-800' : 'text-gray-500'}`}>{day.name}</span>
                                                </label>
                                            </div>
                                            {activeDays.includes(day.id) && (
                                                <textarea
                                                    value={customMessages[day.id] || ''}
                                                    onChange={(e) => handleMessageChange(day.id, e.target.value)}
                                                    className="w-full text-sm p-2 rounded-lg border border-rose-100 bg-white/80 resize-none h-16"
                                                    placeholder={`Message for ${day.name}...`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 ${formData.theme === 'rose' ? 'bg-rose-600 hover:bg-rose-700' : formData.theme === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'}`}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Create Link 🔗'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center animate-in fade-in zoom-in duration-300 py-10">
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 p-6 rounded-full shadow-inner">
                                <LinkIcon className="text-green-600 w-16 h-16" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-cursive font-bold text-rose-700 mb-4">Link Created! 🎉</h2>
                        <p className="text-gray-600 mb-8 text-lg">Send this magical link to <strong>{formData.receiverName}</strong>:</p>

                        <div className="bg-white/80 p-6 rounded-2xl border-2 border-dashed border-rose-300 mb-8 break-all font-mono text-rose-800 shadow-sm relative group cursor-pointer hover:bg-rose-50 transition-colors" onClick={copyToClipboard}>
                            {generatedLink}
                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Copy size={16} className="text-rose-400" />
                            </div>
                        </div>

                        <button
                            onClick={copyToClipboard}
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2 mb-6"
                        >
                            <Copy size={24} /> Copy Link
                        </button>
                        <button
                            onClick={() => setGeneratedLink(null)}
                            className="text-gray-500 hover:text-rose-600 underline font-medium"
                        >
                            Create Another
                        </button>
                    </div>
                )}
            </div>

            {/* Attribution Footer */}
            <div className="mt-8 text-center pb-4 opacity-40 hover:opacity-100 transition-opacity duration-300">
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    Developed by Debajyoti Upadhayaya
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
