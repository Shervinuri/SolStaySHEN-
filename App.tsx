import React, { useState, useEffect } from 'react';
import { BLOCKCHAIN_DATA, TRANSLATIONS } from './constants';
import { Language, BlockchainData } from './types';
import CodeBlock from './components/CodeBlock';
import TradingViewWidget from './components/TradingViewWidget';

// --- Assets ---
const TVLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 464 464" className="w-8 h-8 text-white fill-current">
    <path d="M232 464A232 232 0 1 0 232 0a232 232 0 0 0 0 464zm0-35a197 197 0 1 1 0-394 197 197 0 0 1 0 394zm53.48-283.74v84.61a58.55 58.55 0 0 0-46.75-23.36 58.4 58.4 0 0 0-58.4 58.4 58.4 58.4 0 0 0 46.75 57.51v-27.1a31.42 31.42 0 0 1-19.74-29.56 31.41 31.41 0 1 1 62.82 0v24.23h26.98v-23.38a58.46 58.46 0 0 0-11.66-35.61l.03-.03 23.36-23.37.03.04a85.28 85.28 0 0 1 20.21 58.97h26.98a112.5 112.5 0 0 0-70.61-105.78zM140.48 243.6a31.41 31.41 0 0 1 31.41-31.41v-26.98a58.4 58.4 0 0 0-58.4 58.4v84.62h26.99V243.6z"/>
    <path d="M285.48 153.27h-26.98v26.99h26.98z"/>
  </svg>
);

// --- Component: Live Data Terminal (Table) ---
const LiveTickerTable: React.FC<{ data: BlockchainData[], t: any }> = ({ data, t }) => {
  const [liveData, setLiveData] = useState<BlockchainData[]>(data);

  useEffect(() => {
    const baseValues = data.map(item => ({
      ...item,
      rawTps: parseInt(item.tps.replace(/[^0-9]/g, '')) || 10
    }));

    const interval = setInterval(() => {
      setLiveData(current => {
        return baseValues.map((item) => {
          // Simulate Hashrate/TPS fluctuation
          const variance = item.rawTps * 0.05; // 5% variance
          const noise = (Math.random() - 0.5) * 2 * variance;
          const newValue = Math.floor(item.rawTps + noise);
          return { ...item, tps: `~${newValue.toLocaleString()}` };
        });
      });
    }, 1000); 

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="overflow-hidden border border-tv-border rounded bg-tv-card shadow-sm mt-6 mb-8">
      <div className="bg-[#1e222d] border-b border-tv-border px-4 py-3 flex justify-between items-center">
        <span className="font-mono text-xs font-bold text-tv-muted uppercase tracking-wider">{t.tableTitle}</span>
        <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-tv-green animate-pulse"></span>
            <span className="text-[10px] text-tv-green font-mono uppercase">Live Stream</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-mono">
          <thead className="bg-[#131722] text-tv-muted text-xs uppercase">
            <tr>
              <th className="px-4 py-3 border-b border-tv-border w-16 text-center">#</th>
              <th className="px-4 py-3 border-b border-tv-border">{t.colBlockchain}</th>
              <th className="px-4 py-3 border-b border-tv-border text-right">{t.colTps}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tv-border">
            {liveData.map((chain) => (
              <tr key={chain.name} className="hover:bg-[#2a2e39] transition-colors">
                <td className="px-4 py-3 text-center text-tv-muted opacity-50">{chain.rank}</td>
                <td className="px-4 py-3 text-tv-text">
                  <span className="font-bold mr-2">{chain.name}</span>
                  {chain.note && (
                    <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                        chain.note.includes('Reactor') 
                        ? 'bg-blue-900/30 text-blue-400 border border-blue-800' 
                        : 'bg-yellow-900/30 text-yellow-500 border border-yellow-800'
                    }`}>
                        {chain.note}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-tv-text tabular-nums">
                    {chain.tps} <span className="text-tv-muted text-[10px]">TPS</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main App ---
const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'fa' : 'en');

  return (
    <div className={`min-h-screen bg-tv-bg text-tv-text font-sans ${lang === 'fa' ? 'font-[Inter]' : ''}`}>
      
      {/* Navbar - Pure Utility */}
      <nav className="fixed top-0 left-0 w-full h-14 bg-[#1e222d] border-b border-tv-border flex items-center justify-between px-6 z-50">
         <div className="flex items-center gap-3">
            <TVLogo />
            <div className="h-5 w-px bg-tv-border mx-2"></div>
            <span className="font-semibold text-sm tracking-wide text-white">Research Terminal</span>
         </div>
         <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="text-xs font-bold text-tv-text hover:text-white bg-tv-border px-3 py-1.5 rounded transition-colors uppercase"
            >
              {lang === 'en' ? 'English' : 'فارسی'}
            </button>
         </div>
      </nav>

      {/* Content Container - Single Column, Research Paper Style */}
      <div className="pt-24 pb-24 max-w-[840px] mx-auto px-6">
        
        {/* 1. HEADER: Title & Meta */}
        <header className="mb-12 border-b border-tv-border pb-8">
           <div className="flex flex-wrap gap-3 mb-4 text-xs font-mono uppercase tracking-wider text-tv-muted">
              <span className="text-tv-blue">Algorithmic Trading</span>
              <span>•</span>
              <span>Cryptocurrency</span>
              <span>•</span>
              <span>Market Structure</span>
           </div>
           
           <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.2] tracking-tight">
             {t.title}
           </h1>
           
           <div className="flex items-center justify-between mt-6">
              <div className="flex flex-col gap-1">
                 <span className="text-sm font-bold text-white">Shervin Noori</span>
                 <span className="text-xs text-tv-muted">{t.dateLabel}: Dec 9, 2025</span>
              </div>
              <div className="bg-[#2a2e39] px-3 py-1 rounded text-xs font-mono text-tv-text border border-tv-border">
                {t.classification}
              </div>
           </div>
        </header>

        {/* 2. ABSTRACT */}
        <section className="mb-16 bg-[#1e222d] border-l-4 border-tv-blue p-6 rounded-r-lg">
          <h2 className="text-sm font-bold text-tv-muted uppercase mb-3 tracking-widest">{t.abstractTitle}</h2>
          <p className="text-base md:text-lg leading-relaxed text-tv-text text-justify">
            {t.abstractBody}
          </p>
        </section>

        {/* 3. CHAPTER I: Velocity */}
        <article className="mb-16">
          <div className="flex items-baseline gap-4 mb-4 border-b border-tv-border pb-2">
             <h2 className="text-2xl font-bold text-white">{t.ch1Title}</h2>
          </div>
          <p className="text-base leading-7 text-tv-text opacity-90 text-justify mb-6">
            {t.ch1Body}
          </p>
        </article>

        {/* 4. CHAPTER II: The Anomaly */}
        <article className="mb-16">
          <div className="flex items-baseline gap-4 mb-4 border-b border-tv-border pb-2">
             <h2 className="text-2xl font-bold text-white">{t.ch2Title}</h2>
          </div>
          <h3 className="text-lg text-tv-blue font-medium mb-4 italic">{t.ch2Subtitle}</h3>
          
          <p className="text-base leading-7 text-tv-text opacity-90 text-justify mb-8">
            {t.ch2BodyP1}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
             <div className="bg-[#1e222d] p-5 rounded border border-tv-border hover:border-tv-red transition-colors group">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                   <span className="text-tv-red group-hover:scale-125 transition-transform">▼</span> {t.ch2List1Title}
                </h4>
                <p className="text-sm leading-relaxed text-tv-muted group-hover:text-tv-text transition-colors text-justify">
                   {t.ch2List1Body}
                </p>
             </div>
             
             <div className="bg-[#1e222d] p-5 rounded border border-tv-border hover:border-tv-green transition-colors group">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                   <span className="text-tv-green group-hover:scale-125 transition-transform">▲</span> {t.ch2List2Title}
                </h4>
                <p className="text-sm leading-relaxed text-tv-muted group-hover:text-tv-text transition-colors text-justify">
                   {t.ch2List2Body}
                </p>
             </div>
          </div>
        </article>

        {/* 5. CHAPTER III: Data (Table) */}
        <article className="mb-16">
          <div className="flex items-baseline gap-4 mb-4 border-b border-tv-border pb-2">
             <h2 className="text-2xl font-bold text-white">{t.ch3Title}</h2>
          </div>
          <p className="text-base leading-7 text-tv-text opacity-90 mb-4">
            {t.ch3Body}
          </p>
          
          {/* Live Data Terminal Component */}
          <LiveTickerTable data={BLOCKCHAIN_DATA} t={t} />
        </article>

        {/* 6. CHAPTER IV: Charts */}
        <article className="mb-16">
           <div className="flex items-baseline gap-4 mb-4 border-b border-tv-border pb-2">
             <h2 className="text-2xl font-bold text-white">{t.ch4Title}</h2>
          </div>
          <p className="text-base leading-7 text-tv-text opacity-90 mb-8">
            {t.ch4Body}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#1e222d] p-2 border border-tv-border rounded">
             <div className="w-full">
                <div className="text-xs font-mono text-center text-tv-muted py-1 border-b border-tv-border mb-1">BTC/USDT (1m) - Baseline</div>
                <TradingViewWidget symbol="BINANCE:BTCUSDT" containerId="tv_btc_thesis" />
             </div>
             <div className="w-full">
                <div className="text-xs font-mono text-center text-tv-muted py-1 border-b border-tv-border mb-1">SOL/USDT (1m) - Reactor</div>
                <TradingViewWidget symbol="BINANCE:SOLUSDT" containerId="tv_sol_thesis" />
             </div>
          </div>
        </article>

        {/* 7. CHAPTER V: Code */}
        <article className="mb-16">
           <div className="flex items-baseline gap-4 mb-4 border-b border-tv-border pb-2">
             <h2 className="text-2xl font-bold text-white">{t.ch5Title}</h2>
          </div>
          <p className="text-base leading-7 text-tv-text opacity-90 mb-4">
            {t.ch5Body}
          </p>
          <CodeBlock />
        </article>

        {/* 8. CONCLUSION */}
        <section className="mb-20 pt-8 border-t-2 border-tv-border">
           <h2 className="text-xl font-bold text-white mb-4">{t.conclusionTitle}</h2>
           <p className="text-lg leading-relaxed text-tv-text text-justify">
              {t.conclusionBody}
           </p>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-tv-border bg-[#1e222d] py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-tv-muted text-xs mb-8">{t.footerText}</p>
          
          <a 
            href="https://T.me/shervini" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-block font-sans text-sm font-medium tracking-wide transition-all duration-300 transform hover:scale-105"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-white via-gray-400 to-gray-700 bg-[length:200%_auto] hover:bg-right transition-all duration-700 font-bold" style={{ textShadow: "0px 0px 20px rgba(255,255,255,0.1)" }}>
              Exclusive SHΞN™ made
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;