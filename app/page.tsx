"use client";

import { useState, useEffect } from "react";
import en from "../locales/en.json";
import zh from "../locales/zh.json";

type Locale = "en" | "zh";
type Theme = "light" | "dark" | "system";

const locales = { en, zh };

// Icons
const WindowsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 18.5V12.5H10.5V19.5L3 18.5ZM11.5 4.3L21 3V11.5H11.5V4.3ZM11.5 12.5H21V21L11.5 19.7V12.5Z"/>
  </svg>
);

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
  </svg>
);

const CommandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-1 2.65V12a4 4 0 0 1-6 3.46V12a4 4 0 0 1-1-2.65V6a4 4 0 0 1 4-4z"/>
    <path d="M12 22v-6"/><path d="M8 22h8"/><circle cx="12" cy="9" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
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

function getSystemLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("zh")) return "zh";
  return "en";
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const [command, setCommand] = useState("");

  const t = locales[locale];

  useEffect(() => {
    setMounted(true);
    // Load saved locale or detect system locale
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    if (savedLocale && (savedLocale === "en" || savedLocale === "zh")) {
      setLocale(savedLocale);
    } else {
      setLocale(getSystemLocale());
    }
    // Load saved theme
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

  const features = [
    { icon: <CommandIcon />, title: t.features.naturalLanguage.title, description: t.features.naturalLanguage.description },
    { icon: <WindowsIcon />, title: t.features.windows.title, description: t.features.windows.description },
    { icon: <AndroidIcon />, title: t.features.android.title, description: t.features.android.description },
    { icon: <BrainIcon />, title: t.features.recognition.title, description: t.features.recognition.description },
  ];

  const useCases = locale === "zh" ? [
    { command: "打开 Chrome 搜索最新科技新闻", platform: "Windows" },
    { command: "截图并保存到桌面", platform: "Windows" },
    { command: "打开微信给张三发消息", platform: "Android" },
    { command: "清除应用缓存并重启", platform: "Android" },
  ] : [
    { command: "Open Chrome and search for the latest tech news", platform: "Windows" },
    { command: "Take a screenshot and save it to Desktop", platform: "Windows" },
    { command: "Open WeChat and send a message to John", platform: "Android" },
    { command: "Clear app cache and restart the application", platform: "Android" },
  ];

  const terminalDemo = locale === "zh" ? {
    command: "打开记事本并输入 \"Hello World\"",
    steps: ["正在启动记事本...", "检测到窗口: 无标题 - 记事本", "正在输入文本: \"Hello World\"", "任务执行成功"]
  } : {
    command: "Open Notepad and type \"Hello World\"",
    steps: ["Launching Notepad...", "Window detected: Untitled - Notepad", "Typing text: \"Hello World\"", "Task completed successfully"]
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-dim to-accent flex items-center justify-center">
              <span className="text-white dark:text-background font-bold text-sm">M</span>
            </div>
            <span className="font-semibold text-lg">MaaAI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="hidden sm:block text-sm text-foreground/70 hover:text-foreground transition-colors">{t.nav.features}</a>
            <a href="#demo" className="hidden sm:block text-sm text-foreground/70 hover:text-foreground transition-colors">{t.nav.demo}</a>
            <a href="https://github.com/MaaXYZ/MaaMCP" target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-surface-light transition-colors text-foreground/70 hover:text-foreground" title="GitHub">
              <GitHubIcon />
            </a>
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-accent/10 rounded-full blur-2xl animate-pulse-glow"></div>
              <div className="relative px-4 py-2 rounded-full border border-accent/30 bg-surface text-sm text-accent">
                {t.hero.badge}
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t.hero.title}
              <br />
              <span className="text-accent glow-text">{t.hero.titleHighlight}</span>
            </h1>
            
            <p className="text-lg text-foreground/60 mb-10 max-w-2xl mx-auto">{t.hero.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/MaaXYZ/MaaMCP" target="_blank" rel="noopener noreferrer" className="btn-primary">{t.hero.getStarted}</a>
              <a href="#demo" className="btn-secondary">{t.hero.seeDemo}</a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="gradient-border p-6 glow">
              <div className="bg-surface-light rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-4 text-sm text-foreground/40 font-mono">MaaAI Terminal</span>
                </div>
                <div className="font-mono text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-accent">❯</span>
                    <span className="text-foreground/80">{terminalDemo.command}</span>
                  </div>
                  {terminalDemo.steps.slice(0, 3).map((step, i) => (
                    <div key={i} className="text-foreground/50 pl-5"><span className="text-green-500">✓</span> {step}</div>
                  ))}
                  <div className="text-foreground/50 pl-5"><span className="text-accent">●</span> {terminalDemo.steps[3]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.features.title}</h2>
            <p className="text-foreground/60 max-w-xl mx-auto">{t.features.description}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="gradient-border p-6 hover:bg-surface-light/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.demo.title}</h2>
            <p className="text-foreground/60 max-w-xl mx-auto">{t.demo.description}</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="gradient-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <input type="text" value={command} onChange={(e) => setCommand(e.target.value)} placeholder={t.demo.placeholder}
                  className="flex-1 bg-surface-light border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent/50 transition-colors"/>
                <button className="btn-primary whitespace-nowrap">{t.demo.execute}</button>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-foreground/50 mb-3">{t.demo.examples}</p>
                {useCases.map((useCase, index) => (
                  <button key={index} onClick={() => setCommand(useCase.command)}
                    className="w-full text-left p-3 rounded-lg bg-surface-light/50 hover:bg-surface-light border border-transparent hover:border-border transition-all group">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{useCase.command}</span>
                      <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">{useCase.platform}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.howItWorks.title}</h2>
            <p className="text-foreground/60 max-w-xl mx-auto">{t.howItWorks.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[t.howItWorks.step1, t.howItWorks.step2, t.howItWorks.step3].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4 text-2xl font-bold">{index + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-foreground/60 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-12 text-center glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-foreground/60 mb-8 max-w-xl mx-auto">{t.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/MaaXYZ/MaaMCP" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2">
                <GitHubIcon /> {t.cta.viewGithub}
              </a>
              <a href="https://github.com/MaaXYZ/MaaMCP#readme" target="_blank" rel="noopener noreferrer" className="btn-secondary">{t.cta.readDocs}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-dim to-accent flex items-center justify-center">
                <span className="text-white dark:text-background font-bold text-sm">M</span>
              </div>
              <span className="font-semibold">MaaAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-foreground/60">
              <a href="https://github.com/MaaXYZ/MaaMCP" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="https://github.com/MaaXYZ/MaaMCP#readme" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t.footer.documentation}</a>
              <span>maa-ai.com</span>
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">京ICP备XXXXXXXX号-1</a>
            </div>
            <p className="text-sm text-foreground/40">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
