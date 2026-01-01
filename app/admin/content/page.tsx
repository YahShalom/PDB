'use client';
import React, { useEffect, useState } from 'react';
import { ContentBlock } from '@/lib/cmsTypes';
import { Sparkles, Loader2 } from 'lucide-react';

export default function ContentAdmin() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [rewritingKey, setRewritingKey] = useState<string | null>(null);

  // Grouped keys configuration for better UI
  const groups = [
    { name: 'Hero Section', prefix: 'hero' },
    { name: 'About Section', prefix: 'about' },
    { name: 'Brand Info', prefix: 'brand' },
    { name: 'Footer', prefix: 'footer' },
    { name: 'Labels & UI', prefix: 'labels' },
  ];

  useEffect(() => {
    fetch('/api/cms/content')
      .then(res => res.json())
      .then(data => {
        setBlocks(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (key: string, value: string) => {
    // Optimistic update
    const newBlocks = [...blocks];
    const idx = newBlocks.findIndex(b => b.key === key);
    if (idx >= 0) newBlocks[idx].value = value;
    else newBlocks.push({ id: key, key, value, updatedAt: new Date().toISOString() });
    setBlocks(newBlocks);

    await fetch('/api/cms/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    });
  };

  const handleAiRewrite = async (key: string, currentValue: string) => {
    if (!currentValue.trim()) return;
    setRewritingKey(key);
    
    try {
        const res = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: currentValue, task: 'rewrite' })
        });
        const data = await res.json();
        if (data.result) {
            handleSave(key, data.result);
        } else {
            alert('AI generation failed');
        }
    } catch (e) {
        console.error(e);
        alert('AI generation failed');
    } finally {
        setRewritingKey(null);
    }
  };

  if (loading) return <div>Loading content...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold">Text Content</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
             <Sparkles size={14} className="text-gold" />
             <span>AI Assisted Editing Enabled</span>
        </div>
      </div>
      
      <div className="space-y-12">
        {groups.map(group => {
            // Find existing blocks or create empty placeholders for known keys if you had a predefined list
            // For now, we list what exists.
            const groupBlocks = blocks.filter(b => b.key.startsWith(group.prefix));
            
            return (
                <section key={group.name} className="bg-white p-6 rounded-xl border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">{group.name}</h2>
                    {groupBlocks.length === 0 && <p className="text-sm text-gray-400">No content edited yet. Go to the site to initialize or add manually.</p>}
                    <div className="space-y-6">
                        {groupBlocks.map(block => (
                            <div key={block.key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                <label className="text-sm font-medium text-gray-600 md:col-span-1 pt-2 break-all">
                                    {block.key}
                                </label>
                                <div className="md:col-span-3">
                                    <div className="relative">
                                        <textarea 
                                            className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-sm transition-all"
                                            rows={2}
                                            value={block.value}
                                            onChange={(e) => {
                                                const newBlocks = [...blocks];
                                                const idx = newBlocks.findIndex(b => b.key === block.key);
                                                if (idx >= 0) newBlocks[idx].value = e.target.value;
                                                setBlocks(newBlocks);
                                            }}
                                            onBlur={(e) => handleSave(block.key, e.target.value)}
                                        />
                                        <button 
                                            onClick={() => handleAiRewrite(block.key, block.value)}
                                            disabled={rewritingKey === block.key}
                                            title="Rewrite with Gemini"
                                            className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-gold hover:bg-gold/10 rounded-md transition-colors"
                                        >
                                            {rewritingKey === block.key ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1 flex justify-between">
                                        <span>Click outside to save.</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Add new key helper */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <details>
                            <summary className="text-xs text-blue-600 cursor-pointer">Add new key to {group.name}</summary>
                            <form 
                                className="mt-2 flex gap-2"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const keyInput = form.elements.namedItem('key') as HTMLInputElement;
                                    const valInput = form.elements.namedItem('value') as HTMLInputElement;
                                    const fullKey = `${group.prefix}.${keyInput.value}`;
                                    handleSave(fullKey, valInput.value);
                                    form.reset();
                                }}
                            >
                                <input name="key" placeholder="suffix (e.g. title)" className="border p-1 text-sm rounded" required />
                                <input name="value" placeholder="Value" className="border p-1 text-sm rounded flex-grow" required />
                                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Add</button>
                            </form>
                        </details>
                    </div>
                </section>
            );
        })}
      </div>
    </div>
  );
}