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
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#030303] relative overflow-hidden">
    {/* Cinematic Ambient Background */}
    <div className="absolute w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

    <div className="relative w-full max-w-2xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl animate-in fade-in zoom-in-95 duration-1000">

        {/* Header Section */}
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-4 justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">System Initialization</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter text-center">
                SHARE <span className="font-black">RESOURCE</span>
            </h2>
            <p className="text-white/30 text-center mt-4 text-sm font-medium tracking-wide">
                Share you're knowledge
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title Input */}
                <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-1 transition-colors group-focus-within:text-indigo-400">
                        Resource name
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Quantum Analytics"
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all text-sm"
                        required
                    />
                </div>

                {/* Tags Input */}
                <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-1 transition-colors group-focus-within:text-indigo-400">
                        Tags
                    </label>
                    <input
                        type="text"
                        name="tags"
                        placeholder="Research, Data, AI"
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-1 transition-colors group-focus-within:text-indigo-400">
                    Description / Summary
                </label>
                <textarea
                    name="description"
                    rows="4"
                    placeholder="Provide a high-level overview of the resource contents..."
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all text-sm resize-none leading-relaxed"
                    required
                />
            </div>

            {/* File Upload Area */}
            <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-1 transition-colors group-focus-within:text-indigo-400">
                    Resource
                </label>
                <div className="relative">
                    <input
                        type="file"
                        onChange={handleFile}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        required
                    />
                    <div className={`w-full bg-white/[0.02] border-2 border-dashed ${form.file ? 'border-indigo-500/40 bg-indigo-500/5' : 'border-white/10'} rounded-3xl p-10 flex flex-col items-center justify-center transition-all group-hover:bg-white/[0.04] group-hover:border-white/20`}>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border ${form.file ? 'bg-indigo-500 text-white border-none' : 'bg-white/5 border-white/10 text-white/20'}`}>
                            {form.file ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            )}
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                            {form.file ? form.file.name : "Drop here or browse"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                disabled={isUploading}
                className="w-full group relative flex items-center justify-center gap-3 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] h-16 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-30 mt-6 shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
            >
                {isUploading ? (
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <span>Uploading...</span>
                    </div>
                ) : (
                    <>
                        <span>Publish Resource</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </>
                )}
                {/* Subtle sheen */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
        </form>
    </div>
</div>
    );
};

export default UploadResource;
