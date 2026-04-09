import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png"
const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 px-6 py-4">
            {/* Glassmorphic Background Layer */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20" />

            <div className="relative max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="group flex items-center gap-2">
                    <img src={logo} width={50} height={100}/>
                    <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        ParaDocs
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-2 md:gap-6">
                    {token ? (
                        <>
                            <div className="hidden md:flex items-center gap-6 mr-4">
                                <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                                <Link to="/upload" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Upload</Link>
                                <Link to="/profile" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Profile</Link>
                                <Link to="/chat" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Chat</Link>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-white/10 rounded-full transition-all duration-300 active:scale-95"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
