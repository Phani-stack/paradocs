import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full bg-[#030303] text-white selection:bg-indigo-500/30 overflow-x-hidden">
    {/* Cinematic Background Layer */}
    <div className="fixed inset-0 z-0">
        <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Deep space network"
            className="w-full h-full object-cover opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#030303_90%)]" />
    </div>

    {/* Scrollable Content */}
    <main className="relative z-10 w-full flex flex-col items-center">

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md mb-8">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-indigo-300">v2.0 Protocol Active</span>
            </div>

            <h1 className="text-[clamp(3rem,12vw,8rem)] font-light tracking-tighter leading-none text-center mb-8">
                PARA<span className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">DOCS</span>
            </h1>

            <p className="max-w-2xl text-center text-lg md:text-xl text-zinc-400 leading-relaxed mb-12">
                The definitive architecture for academic synthesis. We’ve rebuilt the
                knowledge pipeline—transforming static PDFs into dynamic, AI-powered
                neural graphs that grow with your research.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 h-14 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    Launch Dashboard
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </button>
                <button className="flex-1 h-14 bg-white/5 border border-white/10 backdrop-blur-xl font-semibold rounded-xl hover:bg-white/10 transition-all">
                    Join Community
                </button>
            </div>
        </section>

        {/* Feature Bento Grid (Lengthy Content) */}
        <section className="w-full max-w-7xl px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Main Feature Card */}
            <div className="md:col-span-2 p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col justify-end min-h-[400px]">
                <h3 className="text-3xl font-bold mb-4">Neural Document Analysis</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                    Stop reading, start conversing. Paradox utilizes proprietary RAG (Retrieval-Augmented Generation)
                    to index your library in real-time. Ask complex cross-document questions and receive
                    cited, peer-reviewed accuracy in seconds.
                </p>
            </div>

            {/* Side Card 1 */}
            <div className="p-8 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 backdrop-blur-sm flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold">End-to-End Encryption</h3>
                <p className="text-zinc-400 text-sm">Your research stays yours. Every file is encrypted before it hits the cloud.</p>
            </div>

            {/* Side Card 2 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2">Live Collaboration</h3>
                <p className="text-zinc-400 text-sm">Sync with your lab group instantly. Share annotations, AI insights, and resource maps in a unified workspace.</p>
                <div className="mt-8 flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030303] bg-zinc-800" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-[#030303] bg-indigo-600 flex items-center justify-center text-[10px] font-bold">+24</div>
                </div>
            </div>

            {/* Bottom Large Content */}
            <div className="md:col-span-3 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                <div className="max-w-3xl">
                    <h2 className="text-4xl font-bold mb-6">Built for the modern academic.</h2>
                    <p className="text-zinc-400 text-lg mb-8">
                        The explosion of information requires a new toolset. Paradox isn't just a storage solution;
                        it's a cognitive multiplier. By integrating latent semantic indexing with a clean,
                        distraction-free interface, we help you find the needle in the haystack of global knowledge.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-2xl font-bold text-white">99.9%</div>
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Uptime</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">50ms</div>
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Latency</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">AES-256</div>
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Security</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">Unlimited</div>
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Storage</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer Subtle */}
        <footer className="w-full py-12 px-6 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="text-xs text-zinc-600 uppercase tracking-[0.5em]">Paradox Systems © 2026</div>
        </footer>
    </main>

    {/* Global Grainy Texture Overlay */}
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
</div>
    );
};

export default LandingPage;
