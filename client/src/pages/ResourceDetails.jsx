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
        <div className="min-h-screen bg-slate-900 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Resource Card */}
                <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">

                    <h1 className="text-3xl font-extrabold text-white mb-2">
                        {resource.title}
                    </h1>

                    <p className="text-slate-300 mb-4">
                        {resource.description}
                    </p>

                    {/* ✅ HASHCODE */}
                    <p className="text-sm text-slate-400 mb-4">
                        Hashcode:
                        <span className="text-blue-400 font-mono ml-2">
                            {resource.hashcode}
                        </span>

                        <button
                            onClick={() => navigator.clipboard.writeText(resource.hashcode)}
                            className="text-xs bg-slate-700 px-3 py-1 rounded-lg ml-3 hover:bg-slate-600"
                        >
                            Copy
                        </button>
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.map((t, idx) => (
                            <span
                                key={idx}
                                className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30"
                            >
                                #{t}
                            </span>
                        ))}
                    </div>

                    {/* Author */}
                    <p className="text-slate-400 mb-4">
                        By <span className="text-white font-semibold">
                            {resource.user?.name}
                        </span>
                    </p>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold transition-transform active:scale-95"
                        >
                            Like ({resource.likes.length})
                        </button>

                        <a
                            href={`http://localhost:8000/${resource.fileUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-xl font-semibold transition-transform active:scale-95"
                        >
                            Download
                        </a>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-slate-800 rounded-3xl p-6 shadow-inner border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-6">
                        Discussion ({resource.comments.length})
                    </h3>

                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {resource.comments.map((c, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-700/50 p-3 rounded-xl hover:bg-slate-700/70 transition-colors"
                            >
                                <p className="text-sm font-semibold text-blue-400">
                                    {c.user?.name || "User"}
                                </p>
                                <p className="text-slate-300">{c.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Add Comment */}
                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={handleComment}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold transition-transform active:scale-95"
                        >
                            Post
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResourceDetails;
