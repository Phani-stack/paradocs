import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx"; // Import the new landing page
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadResource from "./pages/UploadResource.jsx";
import ResourceDetails from "./pages/ResourceDetails.jsx";
import Profile from "./pages/Profile.jsx";
import Chat from "./pages/Chat.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 selection:text-blue-200">

                <Navbar />

                <main className="relative z-0">
                    {/* Background Decorative Glows */}
                    <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/5 blur-[150px] -z-10 pointer-events-none" />
                    <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 blur-[150px] -z-10 pointer-events-none" />

                    <Routes>
                        {/* Landing Page is now the first thing users see */}
                        <Route path="/" element={<LandingPage />} />

                        {/* Moved Dashboard to /home or /explore */}
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/upload" element={<UploadResource />} />
                        <Route path="/resource/:id" element={<ResourceDetails />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/chat" element={<Chat />} />
                    </Routes>
                </main>

                <footer className="py-10 text-center border-t border-white/5 bg-white/[0.01] backdrop-blur-sm">
                    <p className="text-xs font-medium text-slate-500 tracking-widest uppercase">
                        &copy; 2026 Paradox Systems • Advanced Resource Network
                    </p>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
