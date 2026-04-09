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
        <AuthLayout title="Join the Network">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                    {/* Name Field */}
                    <div className="group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Create Password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            "Create Account"
                        )}
                    </div>
                </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-slate-400 text-sm">
                    Already a member?{" "}
                    <button
                        className="text-purple-400 font-semibold hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Register;
