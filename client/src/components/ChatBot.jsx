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
        <div className="max-w-2xl mx-auto flex flex-col h-[85vh]">

            {/* Header */}
            <div className="mb-4 px-1">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">AI PDF Assistant</h2>
                        <p className="text-xs text-slate-400">Ask anything about your document</p>
                    </div>
                </div>
            </div>

            {/* Hash Input */}
            <div className="mb-3 px-1">
                <div className="flex items-center gap-2 bg-slate-800/60 border border-white/8 rounded-xl px-4 py-2.5">
                    <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Enter resource hashcode..."
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        value={hash}
                        onChange={(e) => setHash(e.target.value)}
                    />
                    {hash && (
                        <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full font-medium">
                            linked
                        </span>
                    )}
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 px-1 py-2 scrollbar-thin scrollbar-thumb-slate-700">

                {/* Empty state */}
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/8 flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-300 font-medium text-sm">No messages yet</p>
                            <p className="text-slate-500 text-xs mt-1">Enter a hashcode and ask your first question</p>
                        </div>
                    </div>
                )}

                {/* Message Bubbles */}
                {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

                        {/* Avatar */}
                        <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold mt-0.5
                            ${msg.role === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-700 text-slate-300"
                            }`}>
                            {msg.role === "user" ? "U" : "AI"}
                        </div>

                        {/* Bubble */}
                        <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                            ${msg.role === "user"
                                ? "bg-blue-600 text-white rounded-tr-sm"
                                : "bg-slate-800/80 border border-white/8 text-slate-200 rounded-tl-sm"
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-700 shrink-0 flex items-center justify-center text-xs font-bold text-slate-300">
                            AI
                        </div>
                        <div className="bg-slate-800/80 border border-white/8 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="mt-3 px-1">
                <div className="flex gap-2 bg-slate-800/60 border border-white/8 rounded-2xl p-2">
                    <textarea
                        rows="1"
                        placeholder="Ask a question about your document..."
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none px-2 py-1.5 resize-none"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleAsk}
                        disabled={isLoading || !question.trim()}
                        className="w-9 h-9 shrink-0 flex items-center justify-center bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl transition-all duration-200 active:scale-95 self-end"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <p className="text-center text-[10px] text-slate-600 mt-2">Press Enter to send · Shift+Enter for new line</p>
            </div>

        </div>
    );
};

export default ChatBot;
