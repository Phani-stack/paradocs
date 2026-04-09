import { useNavigate } from "react-router-dom";

const ResourceCard = ({ resource }) => {
    const navigate = useNavigate();

    return (
        <div
    onClick={() => navigate(`/resource/${resource._id}`)}
    className="group relative rounded-[2rem] transition-all duration-500 hover:translate-y-[-4px] cursor-pointer"
>
    {/* Subtle Hover Ambient Glow */}
    <div className="absolute inset-0 bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Glass Card Body */}
    <div className="relative h-full bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] shadow-2xl flex flex-col justify-between overflow-hidden">

        {/* Animated Corner Accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div>
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400/80 mb-2">

                    </div>
                    <h2 className="text-2xl font-light text-white group-hover:text-indigo-300 transition-colors duration-300 leading-tight tracking-tight">
                        {resource.title.split(' ').map((word, i) => (
                            <span key={i} className={i === 0 ? "font-black" : ""}>{word} </span>
                        ))}
                    </h2>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all">
                    <svg className="w-5 h-5 text-white/40 group-hover:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed line-clamp-3 mb-8 font-medium">
                {resource.description || "Synthesizing complex architectural patterns within the knowledge graph for enhanced retrieval and semantic analysis."}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
                {resource.tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-white/[0.03] text-white/60 border border-white/10 rounded-full group-hover:border-indigo-500/20 group-hover:text-indigo-300 transition-all"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Footer - High Contrast Scannability */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white font-black overflow-hidden relative">
                    {resource.user.image ? (
                        <img src={resource.user.image} className="w-full h-full object-cover" alt="" />
                    ) : (
                        resource.user.name.charAt(0)
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">Contributor</span>
                    <span className="text-xs text-white/30 font-medium">{resource.user.name}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-all">
                View details
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </div>
    </div>
</div>
    );
};

export default ResourceCard;
