import { useState } from "react";
import { registerUser } from "../services/api.js";
import AuthLayout from "../components/AuthLayout.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await registerUser(form);
            navigate("/login");
        } catch (err) {
            alert(err.response?.data || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Register Neural Node">
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="space-y-6">
            {/* Identity Assignment (Name) */}
            <div className="relative group">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 ml-1 transition-colors group-focus-within:text-indigo-400">
                    Full Identity
                </label>
                <div className="relative">
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g. Julian Kane"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.04] focus:border-indigo-500/50 transition-all outline-none text-sm tracking-wide"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Communication Protocol (Email) */}
            <div className="relative group">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 ml-1 transition-colors group-focus-within:text-indigo-400">
                    Network Interface
                </label>
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="protocol@paradocs.network"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.04] focus:border-indigo-500/50 transition-all outline-none text-sm tracking-wide"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Security Cipher (Password) */}
            <div className="relative group">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 ml-1 transition-colors group-focus-within:text-indigo-400">
                    Encryption Cipher
                </label>
                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        placeholder="Create complex cipher"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.04] focus:border-indigo-500/50 transition-all outline-none text-sm tracking-widest"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
        </div>

        {/* Primary Action */}
        <button
            disabled={isLoading}
            className="w-full relative group h-14 overflow-hidden bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl transition-all active:scale-[0.97] disabled:opacity-30"
        >
            <div className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <span>Allocating...</span>
                    </>
                ) : (
                    <>
                        <span>Initialize Node</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </>
                )}
            </div>
            {/* Visual Sheen Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
    </form>

    {/* Return to Access Link */}
    <div className="mt-10 pt-8 border-t border-white/5">
        <div className="flex flex-col gap-4 items-center">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
                Existing Access Found?
            </p>
            <button
                className="text-white font-bold text-xs uppercase tracking-widest hover:text-indigo-400 transition-colors py-2 px-6 bg-white/[0.03] border border-white/10 rounded-full"
                onClick={() => navigate("/login")}
            >
                Authorize Link
            </button>
        </div>
    </div>
</AuthLayout>
    );
};

export default Register;
