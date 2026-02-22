"use client";

import SkitlaLogoVariant from "@/components/ui/SkitlaLogoVariant";


export default function LogoTestPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-bold mb-12 text-center">Skitla Logo - Style Exploration</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Variant 1: CYBER VOID */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-mono text-cyan-400 mb-4">&lt;CYBER_VOID /&gt;</h2>
                    <div className="w-full h-[400px] border border-cyan-900/30 rounded-xl overflow-hidden bg-black/50">
                        <SkitlaLogoVariant variant="cyber" />
                    </div>
                </div>

                {/* Variant 2: LIQUID CHROME */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-serif italic text-gray-300 mb-4">Liquid Chrome</h2>
                    <div className="w-full h-[400px] border border-white/10 rounded-xl overflow-hidden bg-gray-900/50">
                        <SkitlaLogoVariant variant="liquid" />
                    </div>
                </div>

                {/* Variant 3: CRYSTAL PRISM */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-light text-pink-300 mb-4">Crystal Prism</h2>
                    <div className="w-full h-[400px] border border-pink-500/20 rounded-xl overflow-hidden bg-pink-900/10">
                        <SkitlaLogoVariant variant="crystal" />
                    </div>
                </div>

                {/* Variant 4: NEURAL NETWORK */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-mono text-green-400 mb-4">Neural Network</h2>
                    <div className="w-full h-[400px] border border-green-900/30 rounded-xl overflow-hidden bg-black/80">
                        <SkitlaLogoVariant variant="neural" />
                    </div>
                </div>

                {/* Variant 5: MORPHING BLOB */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-indigo-400 mb-4">Spline Blob</h2>
                    <div className="w-full h-[400px] border border-indigo-500/30 rounded-xl overflow-hidden bg-indigo-900/20">
                        <SkitlaLogoVariant variant="blob" />
                    </div>
                </div>

                {/* Variant 6: KINETIC ORANGE */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold italic text-orange-500 mb-4">Kinetic Energy</h2>
                    <div className="w-full h-[400px] border border-orange-600/30 rounded-xl overflow-hidden bg-black/80">
                        <SkitlaLogoVariant variant="kinetic" />
                    </div>
                </div>
            </div>
        </div>
    );
}
