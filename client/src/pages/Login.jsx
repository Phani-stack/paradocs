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
        <AuthLayout title="Welcome Back">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {/* Email Field */}
                    <div className="relative group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </div>
                </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-slate-400 text-sm">
                    Don't have an account?{" "}
                    <button
                        className="text-blue-400 font-semibold hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Login;
