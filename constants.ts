import { BlockchainData, CodeSnippet, TranslationContent, Language } from './types';

export const BLOCKCHAIN_DATA: BlockchainData[] = [
  { rank: 1, name: "Solana", tps: "~1,504", note: "Primary Reactor" },
  { rank: 2, name: "Sui", tps: "~854" },
  { rank: 3, name: "BNB Chain", tps: "~378" },
  { rank: 4, name: "Polygon", tps: "~190" },
  { rank: 5, name: "TON", tps: "~175" },
  { rank: 6, name: "Tron", tps: "~160" },
  { rank: 7, name: "Ethereum", tps: "~23" },
  { rank: 8, name: "Bitcoin", tps: "~11", note: "Baseline Asset" },
];

export const PYTHON_CODE = `# SolStaySHΞN™ Anomaly Detector Core
# Copyright (c) 2025 Shervin Noori. All Rights Reserved.

import ccxt
import time

def detect_solstayshen_anomaly():
    exchange = ccxt.binance()
    TIMEFRAME = '1m'
    BTC_PUMP_THRESHOLD = 0.30
    SOL_LAG_RATIO = 0.5 

    print(f"🟢 SolStaySHΞN™ Protocol Activated...")

    while True:
        try:
            btc_ohlcv = exchange.fetch_ohlcv('BTC/USDT', timeframe=TIMEFRAME, limit=2)
            sol_ohlcv = exchange.fetch_ohlcv('SOL/USDT', timeframe=TIMEFRAME, limit=2)
            
            btc_change = ((btc_ohlcv[-1][4] - btc_ohlcv[-1][1]) / btc_ohlcv[-1][1]) * 100
            sol_change = ((sol_ohlcv[-1][4] - sol_ohlcv[-1][1]) / sol_ohlcv[-1][1]) * 100

            if abs(btc_change) >= BTC_PUMP_THRESHOLD:
                if btc_change > 0 and sol_change < (btc_change * SOL_LAG_RATIO):
                    print(f"🚨 ALERT: BTC Pumping (+{btc_change:.2f}%) but SOL Lagging! -> TRAP DETECTED")
                    return True
                elif btc_change < 0 and sol_change > (btc_change * SOL_LAG_RATIO):
                    print(f"🚨 ALERT: BTC Dumping but SOL Holding! -> FAKEOUT DETECTED")
                    return True
            
            time.sleep(2)
        except Exception as e:
            print(e)`;

export const PINE_CODE = `//@version=5
// SolStaySHΞN™ Divergence Hunter
// Copyright (c) 2025 Shervin Noori.

indicator("SolStaySHΞN™ [Shervin Noori]", overlay=true)

btc_sym = input.symbol("BINANCE:BTCUSDT")
sol_sym = input.symbol("BINANCE:SOLUSDT")
threshold = input.float(0.15, "BTC Impulse %")
lag_ratio = input.float(0.5, "Sync Factor")

[btc_o, btc_c] = request.security(btc_sym, timeframe.period, [open, close])
[sol_o, sol_c] = request.security(sol_sym, timeframe.period, [open, close])

btc_chg = ((btc_c - btc_o) / btc_o) * 100
sol_chg = ((sol_c - sol_o) / sol_o) * 100

bearish = btc_chg >= threshold and sol_chg < (btc_chg * lag_ratio)
bullish = btc_chg <= -threshold and sol_chg > (btc_chg * lag_ratio)

plotshape(bearish, "Trap", shape.labeldown, location.abovebar, color.red, 0, "SolStay")
plotshape(bullish, "Resist", shape.labelup, location.belowbar, color.green, 0, "SolStay")`;

export const CODE_SNIPPETS: CodeSnippet[] = [
    { language: 'python', label: 'Python Core Algorithm', code: PYTHON_CODE },
    { language: 'pine', label: 'TradingView Pine Script', code: PINE_CODE }
];

export const TRANSLATIONS: Record<Language, TranslationContent> = {
  en: {
    title: "SolStaySHΞN™: The Correlation Latency & Divergence Anomaly",
    classification: "Proprietary Algorithmic Research",
    authorLabel: "Author",
    dateLabel: "Date",
    
    abstractTitle: "Abstract",
    abstractBody: "The cryptocurrency market is governed by high-frequency correlation algorithms. This paper introduces the SolStaySHΞN™ Hypothesis, which posits that Solana (SOL), due to its superior network throughput and liquidity depth, acts as a primary leading indicator for Bitcoin (BTC) volatility. We demonstrate that when Bitcoin executes an impulse move but Solana fails to synchronize instantaneously—a phenomenon we define as 'The SolStay Event'—the probability of a market reversal or 'fakeout' increases exponentially. This research validates the use of Solana's reaction latency as a filter for high-frequency trading traps.",

    ch1Title: "Chapter I: The Mechanics of Network Velocity",
    ch1Subtitle: "Why Solana Reacts First",
    ch1Body: "To understand the anomaly, we must first establish the hierarchy of network reaction speeds. Bitcoin, utilizing Proof-of-Work (PoW), operates with a block time of ~10 minutes. While it dictates the macro trend, its on-chain confirmation is slow. In contrast, Solana utilizes Proof-of-History (PoH) with block times of ~400ms and a theoretical throughput exceeding 65,000 TPS. In High-Frequency Trading (HFT), arbitrage bots and liquidity providers require the fastest execution layer. Therefore, smart money flows into Solana simultaneously or even milliseconds prior to a sustained Bitcoin move. If capital does not flow into Solana, the move in Bitcoin is likely driven by low-volume derivatives rather than spot demand.",

    ch2Title: "Chapter II: The SolStaySHΞN™ Anomaly",
    ch2Subtitle: "Decoding the Divergence",
    ch2BodyP1: "The core of this protocol lies in the 'Instant Divergence' between the two assets.",
    ch2List1Title: "1. The Bull Trap (Bearish Anomaly):",
    ch2List1Body: "When BTC candles print a rapid upward impulse (>0.3% in 1m), but SOL remains flat, effectively 'staying' at its station. This indicates that the BTC pump is not validated by the broader risk-on market. The SolStaySHΞN™ algorithm flags this as a trap.",
    ch2List2Title: "2. The Bear Trap (Bullish Anomaly):",
    ch2List2Body: "Conversely, if BTC dumps aggressively but SOL refuses to drop or maintains its support level, it signals hidden accumulation. The 'staying' power of Solana in the face of Bitcoin's weakness reveals institutional strength.",

    ch3Title: "Chapter III: Empirical Data & Hierarchy",
    ch3Body: "The following hierarchy establishes the 'Reaction Velocity' of major chains. Solana's position at the top validates its status as the most sensitive reflexivity index.",
    tableTitle: "Network Throughput Hierarchy (Real-World TPS)",
    colRank: "Rank",
    colBlockchain: "Blockchain",
    colTps: "Approx. Daily TPS",

    ch4Title: "Chapter IV: Live Verification (The SolStay Monitor)",
    ch4Body: "Real-time observation of the anomaly requires side-by-side analysis of 1-minute candles.",

    ch5Title: "Chapter V: Algorithmic Implementation",
    ch5Body: "The SolStaySHΞN™ logic has been encapsulated into a deployable Python module for HFT bots and a Pine Script indicator for visual analysis.",

    conclusionTitle: "Conclusion",
    conclusionBody: "The SolStaySHΞN™ protocol proves that in the modern crypto microstructure, price action alone is insufficient. By measuring the 'Latency' of the fastest reactor (Solana) against the baseline asset (Bitcoin), traders can filter out noise with high statistical probability. This framework is now intellectual property of Shervin Noori, codified for automated deployment.",

    footerText: "© 2025 Shervin Noori. All Rights Reserved. | SolStaySHΞN™ Research Repository",
    viewGithub: "View on GitHub"
  },
  fa: {
    title: "SolStaySHΞN™: The Correlation Latency & Divergence Anomaly", // Keep English Title
    classification: "تحقیقات الگوریتمی اختصاصی",
    authorLabel: "نویسنده",
    dateLabel: "تاریخ",
    
    abstractTitle: "چکیده",
    abstractBody: "بازار ارزهای دیجیتال تحت حاکمیت الگوریتم‌های همبستگی با فرکانس بالا است. این مقاله فرضیه SolStaySHΞN™ را معرفی می‌کند که بیان می‌دارد سولانا (SOL) به دلیل توان عملیاتی شبکه و عمق نقدینگی برتر، به عنوان یک شاخص پیشرو اصلی برای نوسانات بیت‌کوین (BTC) عمل می‌کند. ما نشان می‌دهیم که وقتی بیت‌کوین یک حرکت تکانه‌ای انجام می‌دهد اما سولانا موفق به همگام‌سازی فوری نمی‌شود—پدیده‌ای که ما آن را 'رویداد SolStay' می‌نامیم—احتمال بازگشت بازار یا 'حرکت جعلی' به طور تصاعدی افزایش می‌یابد. این تحقیق استفاده از تاخیر واکنش سولانا را به عنوان فیلتری برای تله‌های معاملاتی فرکانس بالا تایید می‌کند.",

    ch1Title: "فصل اول: مکانیک سرعت شبکه",
    ch1Subtitle: "چرا سولانا اول واکنش نشان می‌دهد",
    ch1Body: "برای درک این ناهنجاری، ابتدا باید سلسله مراتب سرعت واکنش شبکه را تعیین کنیم. بیت‌کوین با استفاده از اثبات کار (PoW) با زمان بلاک حدود ۱۰ دقیقه عمل می‌کند. در حالی که روند کلان را دیکته می‌کند، تایید درون‌زنجیره‌ای آن کند است. در مقابل، سولانا از اثبات تاریخ (PoH) با زمان بلاک حدود ۴۰۰ میلی‌ثانیه و توان عملیاتی تئوری بیش از ۶۵,۰۰۰ تراکنش در ثانیه استفاده می‌کند. در معاملات فرکانس بالا (HFT)، ربات‌های آربیتراژ و تامین‌کنندگان نقدینگی به سریع‌ترین لایه اجرایی نیاز دارند. بنابراین، پول هوشمند همزمان یا حتی میلی‌ثانیه‌هایی قبل از حرکت پایدار بیت‌کوین به سولانا سرازیر می‌شود. اگر سرمایه به سولانا وارد نشود، حرکت در بیت‌کوین احتمالا توسط مشتقات کم‌حجم هدایت می‌شود نه تقاضای واقعی.",

    ch2Title: "فصل دوم: ناهنجاری SolStaySHΞN™",
    ch2Subtitle: "رمزگشایی واگرایی",
    ch2BodyP1: "هسته این پروتکل در 'واگرایی لحظه‌ای' بین دو دارایی نهفته است.",
    ch2List1Title: "۱. تله گاوی (ناهنجاری نزولی):",
    ch2List1Body: "زمانی که کندل‌های BTC یک جهش صعودی سریع (بیش از ۰.۳٪ در ۱ دقیقه) ثبت می‌کنند، اما SOL صاف می‌ماند و عملاً در ایستگاه خود 'می‌ماند'. این نشان می‌دهد که پمپاژ BTC توسط بازار ریسک‌پذیر گسترده‌تر تایید نشده است. الگوریتم SolStaySHΞN™ این را به عنوان یک تله علامت‌گذاری می‌کند.",
    ch2List2Title: "۲. تله خرسی (ناهنجاری صعودی):",
    ch2List2Body: "برعکس، اگر BTC به شدت ریزش کند اما SOL از ریزش امتناع ورزد یا سطح حمایت خود را حفظ کند، این نشان‌دهنده انباشت پنهان است. قدرت 'ماندن' سولانا در برابر ضعف بیت‌کوین، قدرت نهادی را آشکار می‌کند.",

    ch3Title: "فصل سوم: داده‌های تجربی و سلسله مراتب",
    ch3Body: "سلسله مراتب زیر 'سرعت واکنش' زنجیره‌های اصلی را تعیین می‌کند. جایگاه سولانا در صدر، وضعیت آن را به عنوان حساس‌ترین شاخص بازتابی تایید می‌کند.",
    tableTitle: "سلسله مراتب توان عملیاتی شبکه (TPS واقعی)",
    colRank: "رتبه",
    colBlockchain: "بلاک‌چین",
    colTps: "تراکنش بر ثانیه (تقریبی)",

    ch4Title: "فصل چهارم: تایید زنده (مانیتور SolStay)",
    ch4Body: "مشاهده بلادرنگ ناهنجاری نیازمند تحلیل کنار هم کندل‌های ۱ دقیقه‌ای است.",

    ch5Title: "فصل پنجم: پیاده‌سازی الگوریتم",
    ch5Body: "منطق SolStaySHΞN™ در یک ماژول پایتون قابل استقرار برای ربات‌های HFT و یک اندیکاتور Pine Script برای تحلیل بصری کپسوله شده است.",

    conclusionTitle: "نتیجه‌گیری",
    conclusionBody: "پروتکل SolStaySHΞN™ ثابت می‌کند که در ریزساختار مدرن کریپتو، پرایس اکشن (حرکت قیمت) به تنهایی کافی نیست. با اندازه‌گیری 'تاخیر' سریع‌ترین رآکتور (سولانا) نسبت به دارایی پایه (بیت‌کوین)، معامله‌گران می‌توانند نویز را با احتمال آماری بالا فیلتر کنند. این چارچوب اکنون در مالکیت معنوی شروین نوری است و برای استقرار خودکار کدنویسی شده است.",

    footerText: "© 2025 شروین نوری. تمامی حقوق محفوظ است. | مخزن تحقیقاتی SolStaySHΞN™",
    viewGithub: "مشاهده در گیت‌هاب"
  }
};