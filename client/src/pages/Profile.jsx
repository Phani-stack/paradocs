import { useEffect, useState } from "react";
import { getAllResources, deleteResource } from "../services/api.js";
import ResourceCard from "../components/ResourceCard.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [myResources, setMyResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await getAllResources();
        const userData = JSON.parse(atob(token.split(".")[1]));
        const filtered = res.data.filter((r) => r.user._id === userData.id);
        setMyResources(filtered);
      } catch (error) {
        console.error("Error fetching profile resources:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchResources();
  }, [token]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    try {
      await deleteResource(id, token);
      setMyResources((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete resource:", err);
    }
  };

  const handleUpdate = (id) => {
    // Navigate to a separate update page (you need to implement UpdateResource page)
    navigate(`/update-resource/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#030303] px-6 py-16 relative overflow-hidden">
    {/* Cinematic Background Accents */}
    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10">

        {/* Profile Header Card */}
        <div className="mb-16 p-10 rounded-[3rem] bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Background Branding SVG */}
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-[0.03] rotate-12 transition-transform duration-1000 group-hover:rotate-0">
                <svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            </div>

            <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Repository Management</span>
                </div>
                <h1 className="text-5xl font-light tracking-tighter text-white mb-4">
                    MY <span className="font-black">COLLECTION</span>
                </h1>
                <p className="text-white/30 text-sm font-medium tracking-wide">
                    Authorized access to <span className="text-white font-bold">{myResources.length}</span> published neural nodes
                </p>
            </div>
        </div>

        {/* Content Grid */}
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-80 bg-white/[0.02] rounded-[2.5rem] animate-pulse border border-white/5" />
                ))}
            </div>
        ) : myResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {myResources.map((res) => (
                    <div key={res._id} className="group relative flex flex-col bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:translate-y-[-4px]">

                        {/* Card Content Area */}
                        <div className="p-8 flex-1 cursor-pointer" onClick={() => navigate(`/resource/${res._id}`)}>
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/20">
                                    Document Node
                                </span>
                                <svg className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-indigo-300 transition-colors">
                                {res.title}
                            </h2>

                            <p className="text-white/40 text-sm line-clamp-2 leading-relaxed mb-6 font-medium">
                                {res.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {res.tags?.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Integrated Management Bar */}
                        <div className="flex border-t border-white/5 bg-black/20 backdrop-blur-md">
                            <button
                                onClick={() => navigate(`/resource/${res._id}`)}
                                className="flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/5 transition-all border-r border-white/5"
                            >
                                View Entry
                            </button>
                            <button
                                onClick={() => handleDelete(res._id)}
                                className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            >
                                Terminate
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            /* Immersive Empty State */
            <div className="flex flex-col items-center justify-center py-32 px-6 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01] transition-colors hover:bg-white/[0.02]">
                <div className="w-20 h-20 bg-white/[0.03] rounded-[2rem] flex items-center justify-center mb-8 border border-white/10 text-white/20">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <h3 className="text-2xl font-light text-white mb-3 tracking-tight">Zero <span className="font-black">Assets</span></h3>
                <p className="text-white/30 text-center max-w-sm text-sm font-medium leading-relaxed mb-8">
                    Your digital repository is currently offline. Initialize your first neural node to begin sharing knowledge.
                </p>
                <button
                    onClick={() => navigate('/upload')}
                    className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform active:scale-95"
                >
                    Initialize Upload
                </button>
            </div>
        )}
    </div>

    {/* Subtle Grain Overlay */}
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
</div>
  );
};

export default Profile;
