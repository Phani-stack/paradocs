import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getResourceById, likeResource, commentResource } from "../services/api.js";

const ResourceDetails = () => {
    const { id } = useParams();
    const [resource, setResource] = useState(null);
    const [comment, setComment] = useState("");
    const token = localStorage.getItem("token");

    const fetchResource = async () => {
        const res = await getResourceById(id);
        setResource(res.data);
    };

    useEffect(() => {
        fetchResource();
    }, [id]);

    const handleLike = async () => {
        await likeResource(id, token);
        fetchResource();
    };

    const handleComment = async () => {
        if (!comment.trim()) return;

        const userData = JSON.parse(atob(token.split('.')[1]));

        await commentResource(id, comment, token);

        setResource(prev => ({
            ...prev,
            comments: [
                ...prev.comments,
                { user: { name: userData.name }, text: comment }
            ]
        }));

        setComment("");
    };

    if (!resource) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030303] py-20 px-6 relative overflow-hidden">
    {/* Decorative Ambient Layers */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

    <div className="max-w-4xl mx-auto space-y-12 relative z-10">

        {/* Main Resource Intelligence Card */}
        <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-2xl">

            {/* Header: Title & Meta */}
            <header className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    {/* <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400">Node Verified</span> */}
                    {/* <div className="h-[1px] w-12 bg-white/10" /> */}
                </div>

                <h1 className="text-4xl md:text-6xl font-light text-white tracking-tighter mb-6 leading-tight">
                    {resource.title.split(' ').map((word, i) => (
                        <span key={i} className={i === 0 ? "font-black" : ""}>{word} </span>
                    ))}
                </h1>

                <p className="text-white/40 text-lg md:text-xl leading-relaxed font-medium balance">
                    {resource.description}
                </p>
            </header>

            {/* Tactical Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 py-8 border-y border-white/5">
                <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Hash Code</span>
                    <div className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-2xl border border-white/5 group">
                        <code className="text-xs text-indigo-300 font-mono truncate">
                            {resource.hashcode}
                        </code>
                        <button
                            onClick={() => navigator.clipboard.writeText(resource.hashcode)}
                            className="ml-auto p-2 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-white"
                            title="Copy Hash"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Publisher</span>
                    <div className="flex items-center gap-3 p-1">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-black text-indigo-400">
                            {resource.user?.name?.charAt(0)}
                        </div>
                        <span className="text-white font-bold tracking-tight">{resource.user?.name}</span>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={handleLike}
                    className="flex-1 flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:bg-neutral-200 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    Like ({resource.likes.length})
                </button>

                <a
                    href={`https://paradocs.onrender.com/${resource.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 bg-white/[0.05] border border-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all hover:bg-white/[0.08] active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download resource
                </a>
            </div>
        </div>

        {/* Discussion Terminal */}
        <section className="space-y-6">
            <div className="flex items-center justify-between px-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                    Neural Feed / {resource.comments.length} Signals
                </h3>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8">
                <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                    {resource.comments.map((c, idx) => (
                        <div key={idx} className="group flex gap-4 animate-in fade-in slide-in-from-left-4">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-[10px] font-black text-white/40">
                                {c.user?.name?.charAt(0) || "U"}
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                                    {c.user?.name || "Anonymous Node"}
                                </span>
                                <p className="text-white/60 text-sm leading-relaxed">{c.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Signal Input */}
                <div className="relative mt-8 group">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="You're comments about this resource.."
                        className="w-full bg-white/[0.03] border border-white/10 text-white px-6 py-5 rounded-2xl placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
                    />
                    <button
                        onClick={handleComment}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black px-6 py-2 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-neutral-200 transition-all active:scale-95"
                    >
                        Comment
                    </button>
                </div>
            </div>
        </section>
    </div>
</div>
    );
};

export default ResourceDetails;
