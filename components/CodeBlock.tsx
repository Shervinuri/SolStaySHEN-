import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../constants';

const CodeBlock: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = CODE_SNIPPETS[activeTab].code;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full border border-tv-border rounded-lg overflow-hidden bg-tv-card shadow-lg my-8">
      {/* Pine Editor Style Header */}
      <div className="flex items-center justify-between bg-[#1e222d] border-b border-tv-border px-4 py-2">
        <div className="flex gap-4">
            {CODE_SNIPPETS.map((snippet, index) => (
            <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-xs font-semibold px-2 py-1 transition-colors relative
                ${activeTab === index 
                    ? 'text-tv-blue' 
                    : 'text-tv-muted hover:text-tv-text'}`}
            >
                {snippet.label}
                {activeTab === index && <span className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-tv-blue"></span>}
            </button>
            ))}
        </div>
        
        <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1 text-xs text-tv-muted hover:text-white bg-tv-border hover:bg-[#363a45] rounded transition-colors"
        >
            {copied ? (
                <span className="text-tv-green font-bold">Copied</span>
            ) : (
                <span>Copy</span>
            )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-0 overflow-x-auto custom-scrollbar bg-[#131722]">
        <pre className="font-mono text-xs md:text-sm leading-6 p-6">
            {CODE_SNIPPETS[activeTab].code.split('\n').map((line, i) => (
                <div key={i} className="table-row hover:bg-[#1e222d] transition-colors duration-75">
                    <span className="table-cell select-none text-tv-muted text-right pr-4 w-10 border-r border-tv-border mr-4 opacity-50">{i + 1}</span>
                    <span className="table-cell pl-4 text-tv-text whitespace-pre-wrap">{line}</span>
                </div>
            ))}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;