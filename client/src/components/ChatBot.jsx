import { useState } from "react";
import { chatWithResource } from "../services/api.js";

const ChatBot = () => {
    const [hash, setHash] = useState("");
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async () => {
        if (!hash || !question.trim()) return alert("Enter hashcode and question");

        const userMsg = { role: "user", text: question };
        setMessages(prev => [...prev, userMsg]);
        setQuestion("");
        setIsLoading(true);

        try {
            const res = await chatWithResource(hash, question);
            const botMsg = { role: "bot", text: res.data.answer || res.data };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "bot", text: "Something went wrong. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAsk();
        }
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col h-[85vh] bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">

    {/* Refined Header - Integrated into the card */}
    <div className="p-6 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-sm font-bold text-white tracking-tight uppercase">AI Assistant</h2>
                    <p className="text-[10px] text-white/40 font-medium uppercase tracking-widest">The 1.0v</p>
                </div>
            </div>

            {/* Minimal Hash Badge */}
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1">
                <div className={`w-1.5 h-1.5 rounded-full ${hash ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`} />
                <input
                    type="text"
                    placeholder="Hash code"
                    className="bg-transparent text-[10px] text-white/70 placeholder:text-white/20 focus:outline-none w-24"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                />
            </div>
        </div>
    </div>

    {/* Messages Area - Styled for deep contrast */}
    <div className="flex-1 overflow-y-auto space-y-6 p-6 scrollbar-none">
        {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 opacity-20">
                <div className="w-16 h-16 rounded-3xl border border-white/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <div className="text-center">
                    <p className="text-white text-sm font-light tracking-widest uppercase">paradocs resource bot</p>
                </div>
            </div>
        )}

        {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-[10px] font-black border
                    ${msg.role === "user" ? "bg-white text-black border-white" : "bg-white/5 text-white border-white/10"}`}>
                    {msg.role === "user" ? "U" : "AI"}
                </div>

                <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-sm leading-relaxed shadow-sm
                    ${msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-white/80 rounded-tl-none backdrop-blur-md"}`}>
                    {msg.text}
                </div>
            </div>
        ))}

        {isLoading && (
            <div className="flex gap-4 animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/40">AI</div>
                <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-3xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
            </div>
        )}
    </div>

    {/* Input Area - Floating with glass effect */}
    <div className="p-6 bg-gradient-to-t from-white/[0.02] to-transparent">
        <div className="flex items-end gap-3 bg-white/[0.05] border border-white/10 rounded-2xl p-2 focus-within:border-indigo-500/50 transition-colors">
            <textarea
                rows="1"
                placeholder="Ask your question.."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none px-3 py-3 resize-none max-h-32"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleAsk}
                disabled={isLoading || !question.trim()}
                className="w-11 h-11 shrink-0 flex items-center justify-center bg-white text-black disabled:bg-white/10 disabled:text-white/20 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 mb-0.5"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </button>
        </div>
        <div className="flex justify-between items-center px-2 mt-3">
            <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.2em]">Paradocs Intelligence Interface</p>
            <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.2em]">Shift + Enter for new line</p>
        </div>
    </div>
</div>
    );
};

export default ChatBot;
