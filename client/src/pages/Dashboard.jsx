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
        <div className="min-h-screen bg-slate-950 px-6 py-10 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                            Resource Hub
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl">
                            Explore and interact with shared documents, research, and technical guides.
                        </p>
                    </div>

                    {/* Optional: Filter/Status pill */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
                            {resources.length} Resources Available
                        </span>
                    </div>
                </div>

                {/* Main Content Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-64 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in-95 duration-700">
                        {resources.map((res) => (
                            <ResourceCard key={res._id} resource={res} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && resources.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <p className="text-slate-500 text-lg">No resources found. Be the first to upload one!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
