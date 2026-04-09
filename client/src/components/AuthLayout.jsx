const AuthLayout = ({ children, title }) => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#030303] overflow-hidden px-6 py-12">
    {/* Cinematic Background Layer - Matching Hero Theme */}
    <div className="absolute inset-0 z-0">
        <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Deep space network"
            className="w-full h-full object-cover opacity-20 scale-110"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)]" />
    </div>

    {/* Refined Glassmorphic Card */}
    <div className="relative z-10 w-full max-w-[440px] bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden group">

        {/* Subtle Internal Glow Effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[80px] group-hover:bg-indigo-500/20 transition-colors duration-700" />

        {/* Header Section */}
        <div className="relative z-10 flex flex-col items-center mb-10 text-center">
            {/* Branding Indicator */}
            <div className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40">Secure Protocol</span>
            </div>

            <h2 className="text-3xl font-light tracking-tight text-white mb-3">
                {title.split(' ').map((word, i) => (
                    <span key={i} className={i === title.split(' ').length - 1 ? "font-black" : "font-light"}>
                        {word}{' '}
                    </span>
                ))}
            </h2>

            <p className="text-xs text-white/30 tracking-widest uppercase">
                Paradox Knowledge Interface
            </p>
        </div>

        {/* Content Area - Minimal Form/Content Handling */}
        <div className="relative z-10 text-zinc-300 antialiased">
            {children}
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50" />
    </div>

    {/* Grainy Texture Overlay */}
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
</div>
    );
};

export default AuthLayout;
