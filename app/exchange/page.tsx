"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import en from "../../locales/en.json";
import zh from "../../locales/zh.json";

type Locale = "en" | "zh";
type Theme = "light" | "dark" | "system";

const locales = { en, zh };

// API 配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com";

interface ExchangeResult {
  original_cdk: string;
  new_cdk: string;
  points: number;
  remaining_days: number;
  expired_at: string;
}

// Icons
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const LanguageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const GiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
    <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

function getSystemLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("zh")) return "zh";
  return "en";
}

export default function ExchangePage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const [cdk, setCdk] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ExchangeResult | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = locales[locale];

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedLocale && (savedLocale === "en" || savedLocale === "zh")) {
      setLocale(savedLocale);
    } else {
      setLocale(getSystemLocale());
    }
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const applyTheme = (isDark: boolean) => {
      document.documentElement.classList.toggle("dark", isDark);
    };
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "zh" : "en";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const getThemeIcon = () => {
    if (theme === "dark") return <MoonIcon />;
    if (theme === "light") return <SunIcon />;
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    );
  };

  const getErrorMessage = (code: number): string => {
    switch (code) {
      case 1002:
        return t.exchange.errors.invalidFormat;
      case 2001:
        return t.exchange.errors.notFound;
      case 3002:
        return t.exchange.errors.alreadyExchanged;
      case 3003:
        return t.exchange.errors.expired;
      case 3004:
        return t.exchange.errors.tooShort;
      case 5001:
      case 5002:
        return t.exchange.errors.serverError;
      default:
        return t.exchange.errors.serverError;
    }
  };

  const handleExchange = async () => {
    if (!cdk.trim()) {
      setError(t.exchange.errors.emptyCdk);
      return;
    }

    //验证 CDK 格式(20-32位字母数字)
    if (!/^[a-zA-Z0-9]{20,32}$/.test(cdk.trim())) {
      setError(t.exchange.errors.invalidFormat);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/points/exchange?cdk=${encodeURIComponent(cdk.trim())}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.code === 0) {
        setResult(data.data);
        setShowModal(true);
      } else {
        setError(getErrorMessage(data.code));
      }
    } catch {
      setError(t.exchange.errors.networkError);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result?.new_cdk) {
      try {
        await navigator.clipboard.writeText(result.new_cdk);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = result.new_cdk;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCdk("");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-dim to-accent flex items-center justify-center">
              <span className="text-white dark:text-background font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-lg">MaaAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={toggleLocale} className="p-2 rounded-lg hover:bg-surface-light transition-colors" title={locale === "en" ? "切换到中文" : "Switch to English"}>
              <LanguageIcon />
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-surface-light transition-colors"
              title={theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System"}>
              {getThemeIcon()}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-accent/10 rounded-full blur-2xl animate-pulse-glow"></div>
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-dim to-accent flex items-center justify-center text-white dark:text-background">
                <GiftIcon />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.exchange.title}</h1>
            <p className="text-foreground/60">{t.exchange.description}</p>
          </div>

          <div className="gradient-border p-8 glow">
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  value={cdk}
                  onChange={(e) => {
                    setCdk(e.target.value);
                    setError("");
                  }}
                  placeholder={t.exchange.cdkPlaceholder}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-4 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent/50 transition-colors font-mono text-center text-lg tracking-wider"
                  maxLength={32}
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                onClick={handleExchange}
                disabled={loading}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? t.exchange.exchanging : t.exchange.exchangeButton}
              </button>

              <div className="text-center">
                <Link href="/" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  ← {t.exchange.backHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-surface rounded-2xl p-8 max-w-md w-full shadow-2xl border border-border">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface-light transition-colors text-foreground/50 hover:text-foreground"
            >
              <CloseIcon />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-green-500">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t.exchange.successTitle}</h2>
            </div>

            <div className="space-y-4">
              {/* New CDK */}
              <div className="p-4 rounded-lg bg-surface-light border border-border">
                <div className="text-sm text-foreground/50 mb-2">{t.exchange.newCdk}</div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 font-mono text-sm text-accent break-all">{result.new_cdk}</code>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-surface transition-colors text-foreground/50 hover:text-foreground flex-shrink-0"
                    title={t.exchange.copy}
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
                {copied && (
                  <div className="text-xs text-green-500 mt-2">{t.exchange.copySuccess}</div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-surface-light border border-border text-center">
                  <div className="text-sm text-foreground/50 mb-1">{t.exchange.points}</div>
                  <div className="text-2xl font-bold text-accent">{result.points}</div>
                </div>
                <div className="p-4 rounded-lg bg-surface-light border border-border text-center">
                  <div className="text-sm text-foreground/50 mb-1">{t.exchange.remainingDays}</div>
                  <div className="text-2xl font-bold text-foreground">{result.remaining_days}</div>
                </div>
              </div>

              {/* Expiry */}
              <div className="p-4 rounded-lg bg-surface-light border border-border">
                <div className="text-sm text-foreground/50 mb-1">{t.exchange.expiredAt}</div>
                <div className="text-foreground font-medium">{result.expired_at}</div>
              </div>

              <button
                onClick={closeModal}
                className="w-full btn-secondary py-3"
              >
                {t.exchange.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-dim to-accent flex items-center justify-center">
                <span className="text-white dark:text-background font-bold text-sm">M</span>
              </div>
              <span className="font-semibold">MaaAI</span>
            </Link>
            <p className="text-sm text-foreground/40">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}