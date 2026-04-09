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
        <AuthLayout title="Create Account">
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-700">
                <div className="space-y-5">
                    {/* Name Field */}
                    <div className="group">
                        <label className="block text-xs font-semibold text-white/50 mb-2 ml-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="group">
                        <label className="block text-xs font-semibold text-white/50 mb-2 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="group">
                        <label className="block text-xs font-semibold text-white/50 mb-2 ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    disabled={isLoading}
                    className="w-full h-12 bg-white text-black font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 hover:bg-neutral-200"
                >
                    {isLoading ? "Creating account..." : "Sign Up"}
                </button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-white/40 text-sm">
                    Already have an account?{" "}
                    <button
                        className="text-white font-bold hover:text-purple-400 transition-colors"
                        onClick={() => navigate("/login")}
                    >
                        Log In
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Register;
