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
        <nav className="sticky top-0 z-50 w-full px-6 py-5">
    {/* Ultra-Thin Glassmorphic Overlay */}
    <div className="absolute inset-0 bg-[#030303]/40 backdrop-blur-md border-b border-white/[0.05]" />

    <div className="relative max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section - Clean Monochrome */}
        <Link to="/" className="group flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="relative">
                <img src={logo} className="w-8 h-8 object-contain brightness-0 invert" alt="Paradox Logo" />
                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <span className="font-light text-xl tracking-[0.2em] uppercase text-white">
                Para<span className="font-black text-white/40">Docs</span>
            </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 md:gap-8">
            {token ? (
                <>
                    {/* Centered Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { name: 'Dashboard', path: '/dashboard' },
                            { name: 'Neural Upload', path: '/upload' },
                            { name: 'Network Chat', path: '/chat' },
                            { name: 'Profile', path: '/profile' }
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Logout with Danger-Glass Style */}
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white/60 bg-white/[0.03] border border-white/10 rounded-full hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all duration-300 active:scale-95"
                    >
                        Disconnect
                    </button>
                </>
            ) : (
                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-white rounded-full hover:bg-neutral-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        Initialize Account
                    </Link>
                </div>
            )}
        </div>
    </div>
</nav>
    );
};

export default Navbar;
