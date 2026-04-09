import { useState } from "react";
import { uploadResource } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const UploadResource = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        tags: "",
        file: null
    });
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e) => {
        setForm({ ...form, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("tags", form.tags);
        fd.append("file", form.file);

        try {
            await uploadResource(fd, token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-slate-950">
            {/* Ambient background glow */}
            <div className="absolute w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="relative w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-white tracking-tight mb-2">
                        Share Resource
                    </h2>
                    <p className="text-slate-400">Contribute your knowledge to the community.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Document Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Advanced System Design"
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            required
                        />
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Briefly describe the contents..."
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Tags Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tags</label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="Backend, Architecture, Java..."
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                    </div>

                    {/* File Upload Area */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">File Attachment</label>
                        <div className="relative group">
                            <input
                                type="file"
                                onChange={handleFile}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                required
                            />
                            <div className="w-full bg-white/5 border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center group-hover:bg-white/[0.08] group-hover:border-blue-500/50 transition-all">
                                <svg className="w-10 h-10 text-slate-500 mb-3 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="text-sm text-slate-400 font-medium">
                                    {form.file ? form.file.name : "Click to browse or drag and drop"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={isUploading}
                        className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
                    >
                        {isUploading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>Publish Resource</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadResource;
