import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden selection:bg-blue-500/30">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        The Next-Gen Knowledge Network
                    </span>
                </div>

                {/* Hero Title */}
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                     <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                        <span className="text-white">PARA</span><span className="text-red-700">DOCS</span>
                    </span>
                </h1>

                {/* Subtext */}
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Securely share, analyze, and discuss academic resources with integrated AI
                    document intelligence. Your personal gateway to collective wisdom.
                </p>

                {/* Main CTA Button */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="group relative px-8 py-4 bg-white text-slate-950 font-black rounded-2xl transition-all active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                    >
                        <div className="flex items-center gap-2">
                            Enter Dashboard
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </button>

                    <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl backdrop-blur-md hover:bg-white/10 transition-all">
                        View Documentation
                    </button>
                </div>

                {/* Stats / Features Preview */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 opacity-50 border-t border-white/5 pt-12 animate-in fade-in duration-1000 delay-500">
                    <div>
                        <div className="text-2xl font-bold text-white">10k+</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Resources</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">AI</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Integrated</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">100%</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Open Source</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">Realtime</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Collaboration</div>
                    </div>
                </div>
            </div>

            {/* Decorative Grid Floor */}
            <div
                className="absolute bottom-0 w-full h-[30%] opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 1), transparent),
                                      linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: '100% 100%, 40px 40px, 40px 40px'
                }}
            />
        </div>
    );
};

export default LandingPage;
