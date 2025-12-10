import React, { useState, useEffect } from 'react';
import { BLOCKCHAIN_DATA, TRANSLATIONS } from './constants';
import { Language, BlockchainData } from './types';
import CodeBlock from './components/CodeBlock';
import TradingViewWidget from './components/TradingViewWidget';

// --- Hooks ---
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
};

// --- Components ---

// 1. Parallax Wrapper
const ParallaxSection: React.FC<{ speed: number; children?: React.ReactNode; className?: string }> = ({ speed, children, className = "" }) => {
  const scrollY = useScroll();
  return (
    <div 
      className={`transition-transform duration-75 ease-out will-change-transform ${className}`} 
      style={{ transform: `translateY(${scrollY * speed}px)` }}
    >
      {children}
    </div>
  );
};

// 2. High-Tech Table
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
          const variance = item.rawTps * 0.04;
          const noise = (Math.random() - 0.5) * 2 * variance;
          const newValue = Math.floor(item.rawTps + noise);
          return { ...item, tps: `${newValue.toLocaleString()}` };
        });
      });
    }, 800); 

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="w-full bg-[#0e1016] border border-[#2a2e39] rounded-sm overflow-hidden shadow-2xl mt-8 font-sans">
      {/* Table Header */}
      <div className="bg-[#1e222d] border-b border-[#2a2e39] px-6 py-4 flex items-center justify-between">
         <span className="text-[#d1d4dc] font-bold text-sm uppercase tracking-wide flex items-center gap-2">
            <div className="w-2 h-2 bg-tv-accent rounded-full animate-pulse"></div>
            {t.tableTitle}
         </span>
         <span className="text-[#787b86] text-xs font-mono">LIVE FEED</span>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-[#131722] text-[#787b86] text-xs uppercase font-medium">
          <tr>
            <th className="px-6 py-3 w-16 text-center border-b border-[#2a2e39]">#</th>
            <th className="px-6 py-3 border-b border-[#2a2e39]">{t.colBlockchain}</th>
            <th className="px-6 py-3 text-right border-b border-[#2a2e39]">{t.colTps}</th>
          </tr>
        </thead>
        <tbody className="text-sm font-mono text-[#d1d4dc]">
          {liveData.map((chain, idx) => (
            <tr key={chain.name} className="hover:bg-[#1e222d] transition-colors border-b border-[#2a2e39] last:border-0">
              <td className="px-6 py-4 text-center text-[#5d606b]">{chain.rank}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base tracking-tight text-[#e0e3eb]">{chain.name}</span>
                  {chain.note && (
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border 
                      ${chain.note.includes('Reactor') 
                        ? 'text-tv-accent border-tv-accent/30 bg-tv-accent/10' 
                        : 'text-orange-400 border-orange-400/30 bg-orange-400/10'}`}>
                      {chain.note}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <span className={`text-base font-bold tracking-tight ${idx === 0 ? 'text-tv-accent' : 'text-[#d1d4dc]'}`}>
                   {chain.tps}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Main App ---
const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // Force LTR layout globally, only change lang attribute
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'fa' : 'en');

  // Helper for text content direction
  const contentDir = lang === 'fa' ? 'rtl' : 'ltr';
  const contentAlign = lang === 'fa' ? 'text-right' : 'text-justify';
  const fontFamily = lang === 'fa' ? 'font-[Inter], sans-serif' : 'font-sans';

  return (
    <div className={`relative min-h-screen bg-tv-bg text-tv-text ${fontFamily} selection:bg-tv-blue selection:text-white`}>
      
      {/* --- Background Elements (Fixed) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] animate-pulse"></div>
        <div className="glow-orb w-[500px] h-[500px] bg-blue-900/20 top-[-100px] left-[-100px]"></div>
        <div className="glow-orb w-[600px] h-[600px] bg-purple-900/10 bottom-0 right-[-200px]"></div>
      </div>

      {/* --- Navbar (Always LTR) --- */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-[#0a0b0e]/95 border-b border-tv-border z-50 transition-all backdrop-blur-sm">
         <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
             <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-lg tracking-tight text-white leading-none">SolStaySHΞN™</span>
                  <span className="text-[10px] text-tv-muted uppercase tracking-widest font-mono">Research Terminal</span>
                </div>
             </div>
             
             <button 
                onClick={toggleLanguage}
                className="text-xs font-bold text-tv-muted hover:text-white transition-colors uppercase tracking-widest px-4 py-2 border border-tv-border rounded hover:border-tv-muted"
             >
               {lang === 'en' ? 'EN / FA' : 'FA / EN'}
             </button>
         </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="relative z-10 pt-32 pb-32 px-6 max-w-4xl mx-auto">
        
        {/* 1. HERO SECTION (Centered) */}
        <div className="relative mb-32 min-h-[60vh] flex flex-col justify-center items-center text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-tv-blue/20 to-purple-500/20 blur-[120px] rounded-full z-[-1]"></div>
            
            <ParallaxSection speed={-0.2}>
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded border border-tv-blue/30 bg-tv-blue/5 text-tv-blue text-[10px] font-mono uppercase tracking-widest">
                 <span>Protocol V.1.0</span>
                 <span className="w-1 h-1 bg-tv-blue rounded-full"></span>
                 <span>Classified</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
                {lang === 'en' ? (
                  <>The Correlation <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Latency & Divergence</span></>
                ) : (
                  t.title
                )}
              </h1>
              <div className="flex items-center justify-center gap-8 text-sm font-medium text-tv-muted">
                 <div className="flex items-center gap-2">
                    <span className="text-white font-bold">Shervin Noori</span>
                 </div>
                 <div className="w-px h-4 bg-tv-border"></div>
                 <span>Dec 09, 2025</span>
              </div>
            </ParallaxSection>
        </div>

        {/* 2. ABSTRACT */}
        <section className="mb-32 relative">
           <ParallaxSection speed={0.1} className="absolute -right-20 -top-20 opacity-10 text-[10rem] font-black text-white select-none z-[-1]">
              00
           </ParallaxSection>
           
           <div 
             className="p-8 md:p-10 border-l-2 border-tv-blue bg-gradient-to-r from-tv-blue/5 to-transparent backdrop-blur-sm"
             dir={contentDir}
           >
              <h2 className={`text-xs font-bold text-tv-blue uppercase tracking-[0.2em] mb-4 ${lang === 'fa' ? 'text-right' : 'text-left'}`}>
                {t.abstractTitle}
              </h2>
              <p className={`text-lg md:text-xl font-serif italic text-gray-300 leading-relaxed ${contentAlign}`}>
                "{t.abstractBody}"
              </p>
           </div>
        </section>

        {/* 3. CHAPTER I & II */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
           {/* Sidebar Line (Always Left) */}
           <div className="md:col-span-1 hidden md:flex flex-col items-center">
              <div className="w-px h-full bg-gradient-to-b from-tv-blue via-tv-border to-transparent"></div>
           </div>
           
           <div className="md:col-span-11 space-y-24">
              
              {/* Chapter I */}
              <article className="relative" dir={contentDir}>
                 <div className={`absolute -top-4 text-6xl font-black text-white/5 font-mono select-none ${lang === 'fa' ? '-right-12' : '-left-12'}`}>
                   01
                 </div>
                 <h2 className={`text-3xl font-bold text-white mb-6 flex items-center gap-4 ${lang === 'fa' ? 'justify-start' : ''}`}>
                    {t.ch1Title}
                 </h2>
                 <p className={`text-base text-gray-400 leading-8 ${contentAlign}`}>
                    {t.ch1Body}
                 </p>
              </article>

              {/* Chapter II */}
              <article className="relative" dir={contentDir}>
                 <div className={`absolute -top-4 text-6xl font-black text-white/5 font-mono select-none ${lang === 'fa' ? '-right-12' : '-left-12'}`}>
                   02
                 </div>
                 <h2 className="text-3xl font-bold text-white mb-2">{t.ch2Title}</h2>
                 <p className="text-tv-blue font-mono text-sm mb-8">{t.ch2Subtitle}</p>
                 
                 <p className={`text-base text-gray-400 leading-8 mb-8 ${contentAlign}`}>
                    {t.ch2BodyP1}
                 </p>

                 <div className="grid md:grid-cols-2 gap-6" dir={contentDir}>
                    <div className="p-6 bg-[#131722] border border-tv-border hover:border-red-900/50 transition-colors group">
                       <h3 className="text-red-400 font-bold mb-3 group-hover:translate-x-1 transition-transform text-sm uppercase tracking-wide">▼ {t.ch2List1Title}</h3>
                       <p className={`text-sm text-gray-500 leading-relaxed ${contentAlign}`}>{t.ch2List1Body}</p>
                    </div>
                    <div className="p-6 bg-[#131722] border border-tv-border hover:border-green-900/50 transition-colors group">
                       <h3 className="text-green-400 font-bold mb-3 group-hover:translate-x-1 transition-transform text-sm uppercase tracking-wide">▲ {t.ch2List2Title}</h3>
                       <p className={`text-sm text-gray-500 leading-relaxed ${contentAlign}`}>{t.ch2List2Body}</p>
                    </div>
                 </div>
              </article>

           </div>
        </div>

        {/* 4. DATA SECTION (Fixed Table) */}
        <section className="mb-32 relative">
            <ParallaxSection speed={0.05} className="absolute inset-0 bg-tv-blue/5 blur-3xl rounded-full z-[-1]"></ParallaxSection>
            <div className="mb-8 border-b border-tv-border pb-4" dir={contentDir}>
               <h2 className="text-2xl font-bold text-white mb-2">{t.ch3Title}</h2>
               <p className="text-tv-muted text-sm">{t.ch3Body}</p>
            </div>
            {/* Table always LTR for numbers */}
            <div dir="ltr">
              <LiveTickerTable data={BLOCKCHAIN_DATA} t={t} />
            </div>
        </section>

        {/* 5. LIVE CHARTS */}
        <section className="mb-32">
           <div className="flex items-center gap-4 mb-8" dir={contentDir}>
              <div className="w-1 h-6 bg-tv-accent"></div>
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">{t.ch4Title}</h2>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" dir="ltr">
              <div className="relative group">
                 <div className="relative bg-[#131722] p-1 border border-tv-border">
                    <TradingViewWidget symbol="BINANCE:BTCUSDT" containerId="tv_btc_thesis" />
                 </div>
              </div>
              <div className="relative group">
                 <div className="relative bg-[#131722] p-1 border border-tv-border">
                    <TradingViewWidget symbol="BINANCE:SOLUSDT" containerId="tv_sol_thesis" />
                 </div>
              </div>
           </div>
        </section>

        {/* 6. ALGORITHM CODE */}
        <section className="mb-32" dir="ltr">
           {/* Code titles always LTR for technical consistency */}
           <h2 className="text-xl font-bold text-white mb-8 border-l-4 border-tv-blue pl-4 text-left">{t.ch5Title}</h2>
           <CodeBlock />
        </section>

        {/* 7. CONCLUSION */}
        <section className="relative py-16 px-6 border-t border-b border-tv-border bg-[#0e1016]" dir={contentDir}>
           <h2 className="text-2xl font-serif font-bold text-white mb-6 text-center">{t.conclusionTitle}</h2>
           <p className={`text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto ${contentAlign}`}>
             {t.conclusionBody}
           </p>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="bg-[#050608] py-20 relative overflow-hidden" dir={contentDir}>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h3 className="text-2xl font-black text-white tracking-widest mb-2">SHΞN™</h3>
            <p className="text-xs text-tv-muted font-mono mb-12 uppercase tracking-[0.3em]">Research Laboratory</p>
            
            <p className="text-sm text-gray-600 mb-8">{t.footerText}</p>
            
            <a href="https://T.me/shervini" target="_blank" rel="noopener noreferrer" className="inline-block group">
               <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] group-hover:scale-105 transition-transform block">
                  Exclusive SHΞN™ made
               </span>
            </a>
         </div>
      </footer>

    </div>
  );
};

export default App;