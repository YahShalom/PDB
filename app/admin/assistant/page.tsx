'use client';
import React, { useState } from 'react';
import { Sparkles, Copy, Loader2, Send } from 'lucide-react';

export default function AiAssistant() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState('social');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, task }),
      });
      const data = await res.json();
      if (data.result) {
        setResult(data.result);
      } else {
        setResult('Error: ' + (data.error || 'Something went wrong'));
      }
    } catch (err) {
      setResult('Failed to connect to AI service.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('Copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gold/20 rounded-full text-yellow-700">
            <Sparkles size={28} />
        </div>
        <div>
            <h1 className="text-3xl font-serif font-bold">Gemini Assistant</h1>
            <p className="text-gray-500">Generate creative content, captions, and strategies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="font-bold mb-4 text-gray-800">1. Select Task</h2>
                <div className="space-y-2">
                    <button 
                        onClick={() => setTask('social')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors border ${task === 'social' ? 'bg-gold/10 border-gold text-yellow-800 font-medium' : 'hover:bg-gray-50 border-gray-200'}`}
                    >
                        📱 Social Media Caption
                    </button>
                    <button 
                        onClick={() => setTask('creative_blog')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors border ${task === 'creative_blog' ? 'bg-gold/10 border-gold text-yellow-800 font-medium' : 'hover:bg-gray-50 border-gray-200'}`}
                    >
                        📝 Blog Post Idea
                    </button>
                    <button 
                        onClick={() => setTask('strategy')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors border ${task === 'strategy' ? 'bg-gold/10 border-gold text-yellow-800 font-medium' : 'hover:bg-gray-50 border-gray-200'}`}
                    >
                        💡 Marketing Strategy
                    </button>
                    <button 
                        onClick={() => setTask('rewrite')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors border ${task === 'rewrite' ? 'bg-gold/10 border-gold text-yellow-800 font-medium' : 'hover:bg-gray-50 border-gray-200'}`}
                    >
                        ✨ Content Polish
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h2 className="font-bold mb-4 text-gray-800">2. Your Input</h2>
                 <form onSubmit={handleGenerate}>
                    <textarea 
                        className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none text-sm"
                        placeholder="E.g., Write a caption for our new bridal package promo..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full mt-4 bg-charcoal-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                        Generate with Gemini
                    </button>
                 </form>
            </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col min-h-[500px]">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-800">Result</h2>
                    {result && (
                        <button 
                            onClick={copyToClipboard}
                            className="text-xs flex items-center gap-1 text-gray-500 hover:text-gold transition-colors"
                        >
                            <Copy size={14} /> Copy
                        </button>
                    )}
                </div>
                
                <div className="flex-grow bg-gray-50 rounded-lg p-6 font-light leading-relaxed whitespace-pre-wrap text-gray-700 overflow-y-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                            <Loader2 className="animate-spin text-gold" size={32} />
                            <p className="animate-pulse">Gemini is thinking...</p>
                        </div>
                    ) : result ? (
                        result
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Sparkles size={48} className="mb-4 text-gray-300" />
                            <p>Select a task and enter a prompt to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}