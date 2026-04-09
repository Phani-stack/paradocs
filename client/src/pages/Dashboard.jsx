import { useEffect, useState } from "react";
import { getAllResources } from "../services/api.js";
import ResourceCard from "../components/ResourceCard.jsx";

const Dashboard = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await getAllResources();
                setResources(res.data);
            } catch (error) {
                console.error("Failed to fetch resources:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-[#030303] overflow-x-hidden selection:bg-indigo-500/30">
    {/* Cinematic Background Layer - Fixed for Depth */}
    <div className="fixed inset-0 z-0 pointer-events-none">
        <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Deep space network"
            className="w-full h-full object-cover opacity-[0.12] scale-110"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
    </div>

    {/* Main Content Wrapper */}
    <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-16">

        {/* Navigation / Breadcrumb - High-End Touch */}
        <div className="flex items-center gap-2 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Network</span>
            <div className="w-4 h-[1px] bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400">Resource Archive</span>
        </div>

        {/* Header Section */}
        <header className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
                <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    NEURAL<span className="font-black text-white/40">HUB</span>
                </h1>
                <p className="text-white/40 text-lg md:text-xl leading-relaxed balance animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                    Access the collective intelligence of the ParaDocs network. Browse
                    encrypted academic assets, cross-link datasets, and initialize
                    AI-driven semantic analysis on shared research.
                </p>
            </div>

            {/* Status & Filter Controls */}
            <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-2xl">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">
                        {resources.length} Nodes Online
                    </span>
                </div>

                {/* Search / Filter Button Example */}
                <button className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-white/40 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                </button>
            </div>
        </header>

        {/* Main Content Grid */}
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="h-80 bg-white/[0.02] rounded-[2.5rem] border border-white/5 animate-pulse" />
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {resources.map((res) => (
                    <ResourceCard key={res._id} resource={res} />
                ))}
            </div>
        )}

        {/* Immersive Empty State */}
        {!loading && resources.length === 0 && (
            <div className="relative flex flex-col items-center justify-center py-32 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03),transparent)]" />
                <div className="relative z-10 text-center space-y-4">
                    <div className="w-20 h-20 bg-white/[0.03] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p className="text-white/40 text-lg font-light tracking-wide uppercase">No intelligence nodes detected.</p>
                    <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 hover:text-indigo-300 transition-colors">
                        Initialize First Upload →
                    </button>
                </div>
            </div>
        )}
    </main>

    {/* Subtle Grain Overlay */}
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
</div>
    );
};

export default Dashboard;
