import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newHeart = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 20 + 10,
                rotation: Math.random() * 360,
            };

            setHearts((prev) => [...prev, newHeart]);

            // Cleanup old hearts
            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
            }, 1000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ opacity: 0.8, scale: 0.5, y: 0 }}
                    animate={{ opacity: 0, scale: 1.5, y: -50 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        left: heart.x,
                        top: heart.y,
                        fontSize: heart.size,
                        transform: `rotate(${heart.rotation}deg)`,
                    }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
