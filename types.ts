export interface BlockchainData {
  rank: number;
  name: string;
  tps: string;
  note?: string;
}

export interface CodeSnippet {
  language: 'python' | 'pine';
  label: string;
  code: string;
}

export interface TranslationContent {
  // Meta
  title: string; // Always English
  classification: string;
  authorLabel: string;
  dateLabel: string;
  
  // Sections
  abstractTitle: string;
  abstractBody: string;

  ch1Title: string;
  ch1Subtitle: string;
  ch1Body: string;

  ch2Title: string;
  ch2Subtitle: string;
  ch2BodyP1: string; // The text before the list
  ch2List1Title: string;
  ch2List1Body: string;
  ch2List2Title: string;
  ch2List2Body: string;

  ch3Title: string;
  ch3Body: string;
  tableTitle: string;
  colRank: string;
  colBlockchain: string;
  colTps: string;

  ch4Title: string;
  ch4Body: string;
  
  ch5Title: string;
  ch5Body: string;

  conclusionTitle: string;
  conclusionBody: string;

  footerText: string;
  viewGithub: string;
}

export type Language = 'en' | 'fa';

// Extend Window interface for TradingView
declare global {
  interface Window {
    TradingView: any;
  }
}