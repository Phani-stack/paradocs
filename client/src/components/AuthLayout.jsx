const AuthLayout = ({ children, title }) => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden px-4">
            {/* Ambient Background Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />

            {/* Glassmorphic Container */}
            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-[2rem] p-8 md:p-10">
                {/* Header Section */}
                <div className="space-y-2 mb-8">
                    <h2 className="text-3xl font-extrabold text-center tracking-tight text-white">
                        {title}
                    </h2>
                    <div className="h-1 w-12 bg-blue-500 rounded-full mx-auto" />
                </div>

                {/* Content Area */}
                <div className="text-slate-200">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
