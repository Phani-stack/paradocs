import { useState } from "react";
import { loginUser } from "../services/api.js";
import AuthLayout from "../components/AuthLayout.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({
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
            const res = await loginUser(form);
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (err) {
            alert(err.response?.data || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Neural Interface Access">
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-1000">
        <div className="space-y-6">
            {/* Email Field with Tactical Labeling */}
            <div className="relative group">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 ml-1 transition-colors group-focus-within:text-indigo-400">
                    Network Identity
                </label>
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="identity@paradocs.network"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.04] focus:border-indigo-500/50 transition-all outline-none text-sm tracking-wide"
                        onChange={handleChange}
                        required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Password Field with Tactical Labeling */}
            <div className="relative group">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 ml-1 transition-colors group-focus-within:text-indigo-400">
                    Access Cipher
                </label>
                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••••••"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.04] focus:border-indigo-500/50 transition-all outline-none text-sm tracking-widest"
                        onChange={handleChange}
                        required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        {/* Tactical Submit Button */}
        <button
            disabled={isLoading}
            className="w-full relative group h-14 overflow-hidden bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl transition-all active:scale-[0.97] disabled:opacity-30"
        >
            <div className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <span>Synchronizing...</span>
                    </>
                ) : (
                    <>
                        <span>Initialize Link</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </>
                )}
            </div>
            {/* Subtle button sheen effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
    </form>

    {/* Footer Link - Minimalized */}
    <div className="mt-10 pt-8 border-t border-white/5">
        <div className="flex flex-col gap-4 items-center">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
                New to the Archive?
            </p>
            <button
                className="text-white font-bold text-xs uppercase tracking-widest hover:text-indigo-400 transition-colors py-2 px-6 bg-white/[0.03] border border-white/10 rounded-full"
                onClick={() => navigate("/register")}
            >
                Create Digital ID
            </button>
        </div>
    </div>
</AuthLayout>
    );
};

export default Login;
