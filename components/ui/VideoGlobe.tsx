"use client";

import React, { useRef, useEffect } from "react";

export default function VideoGlobe() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // Match the slow, cinematic rotation of Arcadia
        }
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* The Cinematic Globe Render */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain pointer-events-none mix-blend-screen opacity-90 scale-125 md:scale-150"
                poster="/globe-poster.png" // Fallback poster if needed
            >
                <source src="https://www.arcadiamarketing.io/videos/blender/globe_animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Atmospheric Glow & Masking to integrate with the black background */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black pointer-events-none" />

            {/* Bottom Fade Mask (Matching Arcadia's fade effect) */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

            <style jsx>{`
                .bg-radial-gradient {
                    background: radial-gradient(circle at center, transparent 30%, black 70%);
                }
            `}</style>
        </div>
    );
}
