import { useNavigate } from "react-router-dom";

const ResourceCard = ({ resource }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/resource/${resource._id}`)}
            className="group relative p-[1px] rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        >
            {/* Animated Gradient Border Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

            {/* Glass Card Body */}
            <div className="relative h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                            {resource.title}
                        </h2>
                        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                        {resource.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {resource.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-[10px] text-white font-medium border border-white/10">
                            {resource.user.name.charAt(0)}
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                            {resource.user.name}
                        </span>
                    </div>

                    <span className="flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:gap-2 transition-all">
                        View Details
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;
