/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Sparkles,
  Filter,
  X,
  Plus,
  Check,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Megaphone,
  Handshake,
  Languages,
  Calculator,
  Presentation,
  Box,
  ShieldCheck,
  Menu,
  Zap,
  Layers,
  Sun,
  Moon,
  Home as HomeIcon,
  Info,
  GitCompare,
  Mail,
  Building2,
  TrendingUp,
  MessageCircle,
  Send,
  Bot,
  Trash2,
  Star,
  Newspaper,
  ThumbsUp,
  MessageSquare,
  Share2,
  Rocket,
  Cpu,
  Code2,
  Palette,
  Video,
  GitBranch,
  Copy,
  ArrowLeft,
  Check as CheckIcon,
} from "lucide-react";
import {
  CATEGORIES,
  TAGS,
  TOOLS,
  DEPARTMENTS,
  ENTERPRISE_HIGHLIGHTS,
  TRENDING,
  FEED_POSTS,
  logoUrl,
  type Tool,
  type Category,
  type Tag,
  type Department,
} from "@/lib/tools-data";

type Page = "home" | "about" | "compare" | "trends" | "contact" | "stack";

const CAT_ICONS: Record<Category, React.ComponentType<{ className?: string }>> = {
  "Education & Learning Tools": GraduationCap,
  "Business & Strategy Tools": Briefcase,
  "Marketing & SEO Tools": Megaphone,
  "Sales & CRM Tools": Handshake,
  "Translation & Language Processing": Languages,
  "Finance & Accounting Tools": Calculator,
  "Presentation & Document Generation": Presentation,
  "3D Modeling & Game Development": Box,
  "Security, Privacy & Compliance Tools": ShieldCheck,
  "Large Language Models & Text Generation": Cpu,
  "Software Development & Coding Agents": Code2,
  "Search, Research & Information Retrieval": Search,
  "Visual Art, Design & Image Generation": Palette,
  "Video, Audio & Avatar Production": Video,
  "Productivity, Automation & Workflow Orchestration": GitBranch,
};

function initials(name: string) {
  return name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
}

/* ---------- Theme ---------- */
function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("aidc-theme") as "dark" | "light") || "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.classList.add("light");
    else root.classList.remove("light");
    localStorage.setItem("aidc-theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

/* ---------- Brand Logo ---------- */
function BrandLogo({ tool, size = 48 }: { tool: Tool; size?: number }) {
  const url = logoUrl(tool);
  const [errored, setErrored] = useState(false);
  return (
    <div
      className="grid place-items-center shrink-0 rounded-xl bg-gradient-to-br from-[#052b66] to-[#1a4ba0] text-white font-bold border border-white/10 overflow-hidden"
      style={{ height: size, width: size, fontSize: size * 0.3 }}
    >
      {url && !errored ? (
        <img
          src={url}
          alt={`${tool.name} logo`}
          className="object-contain"
          style={{ height: size * 0.7, width: size * 0.7 }}
          onError={() => setErrored(true)}
          loading="lazy"
        />
      ) : (
        <span>{initials(tool.name)}</span>
      )}
    </div>
  );
}

/* ---------- Pills ---------- */
function TagPill({ tag, active, onClick }: { tag: Tag; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all duration-200 ${
        active
          ? "bg-accent text-accent-foreground border-accent shadow-[0_0_15px_rgba(69,204,66,0.4)]"
          : "border-[var(--surface-border-strong)] text-fg-soft hover:border-accent/60 hover:text-fg-strong"
      }`}
    >
      {tag}
    </button>
  );
}

function CategoryPill({
  cat,
  active,
  count,
  onClick,
}: {
  cat: Category;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  const Icon = CAT_ICONS[cat];
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
        active
          ? "bg-accent/15 border border-accent/40 text-fg-strong shadow-[0_0_20px_rgba(69,204,66,0.15)]"
          : "border border-transparent hover:bg-[var(--surface-1)] text-fg-soft"
      }`}
    >
      <span
        className={`grid place-items-center h-8 w-8 rounded-lg ${active ? "bg-accent text-accent-foreground" : "bg-[var(--surface-1)] text-fg-soft group-hover:bg-[var(--surface-strong-1)]"}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-sm font-medium leading-tight">{cat}</span>
      <span
        className={`text-[11px] px-2 py-0.5 rounded-full ${active ? "bg-accent text-accent-foreground" : "bg-[var(--surface-strong-1)] text-fg-mute"}`}
      >
        {count}
      </span>
    </button>
  );
}

/* ---------- Tool Card ---------- */
function ToolCard({
  tool,
  inStack,
  onAdd,
  onOpen,
  compareSelected,
  onToggleCompare,
  showCompare,
}: {
  tool: Tool;
  inStack: boolean;
  onAdd: () => void;
  onOpen: () => void;
  compareSelected?: boolean;
  onToggleCompare?: () => void;
  showCompare?: boolean;
}) {
  const highlight = ENTERPRISE_HIGHLIGHTS.has(tool.name);
  const primary = tool.categories[0];
  return (
    <div className="group relative glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_-20px_rgba(69,204,66,0.35)] animate-fade-in-up">
      {highlight && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-accent to-emerald-400 text-accent-foreground shadow-lg">
          <Zap className="h-3 w-3" /> ENTERPRISE PICK
        </div>
      )}
      <div className="flex items-start gap-3">
        <BrandLogo tool={tool} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-semibold text-fg-strong">{tool.name}</h3>
            <div className="flex items-center gap-1">
              {showCompare && (
                <button
                  onClick={onToggleCompare}
                  aria-label="Compare"
                  title="Add to compare"
                  className={`shrink-0 grid place-items-center h-7 w-7 rounded-lg transition-all ${
                    compareSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-[var(--surface-1)] text-fg-soft hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  <GitCompare className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={onAdd}
                aria-label={inStack ? "Remove from stack" : "Add to stack"}
                title={inStack ? "In your stack" : "Add to My Stack"}
                className={`shrink-0 grid place-items-center h-7 w-7 rounded-lg transition-all ${
                  inStack
                    ? "bg-accent text-accent-foreground"
                    : "bg-[var(--surface-1)] text-fg-soft hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {inStack ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {tool.vendor && <p className="text-[11px] text-fg-mute truncate">{tool.vendor}</p>}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/15 text-accent border border-accent/30">
          {primary}
        </span>
        {tool.categories.slice(1, 2).map((c) => (
          <span
            key={c}
            className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--surface-1)] text-fg-soft border border-[var(--surface-border)]"
          >
            {c}
          </span>
        ))}
      </div>

      <p className="mt-3 text-sm text-fg-soft leading-relaxed line-clamp-3">{tool.summary}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-mute"
          >
            {t}
          </span>
        ))}
      </div>

      <button
        onClick={onOpen}
        className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-lg bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong hover:bg-[var(--surface-strong-1)] hover:border-accent/40 transition-all"
      >
        Learn more <ExternalLink className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ---------- Modal ---------- */
function ToolModal({
  tool,
  onClose,
  inStack,
  onToggle,
}: {
  tool: Tool;
  onClose: () => void;
  inStack: boolean;
  onToggle: () => void;
}) {
  const primary = tool.categories[0];
  const Icon = CAT_ICONS[primary];
  const highlight = ENTERPRISE_HIGHLIGHTS.has(tool.name);
  
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center p-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md" />
      
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative glass-strong rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-7 ring-1 ring-accent/20 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] z-[61] scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-transparent"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid place-items-center h-9 w-9 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-strong-1)] text-fg-strong z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          <BrandLogo tool={tool} size={64} />
          <div className="min-w-0 flex-1 pr-8">
            <h2 className="text-2xl font-bold text-fg-strong">{tool.name}</h2>
            {tool.vendor && <p className="text-sm text-fg-mute">by {tool.vendor}</p>}
            <div className="mt-2 flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/30">
                <Icon className="h-3.5 w-3.5" /> {primary}
              </span>
              {tool.categories.slice(1).map((c) => (
                <span
                  key={c}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-soft"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-5 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-transparent">
          {/* Summary */}
          <section className="rounded-2xl p-5 bg-[var(--surface-1)]/60 border border-[var(--surface-border)]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              Summary
            </h3>
            <p className="text-fg-strong leading-relaxed">{tool.summary}</p>
          </section>

          {/* Benefits */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              Primary operational benefits
            </h3>
            <p className="text-fg-soft leading-relaxed">{tool.benefits}</p>
          </section>

          {/* Best For */}
          <section className="rounded-2xl p-5 bg-gradient-to-br from-primary/15 to-transparent border border-primary/30">
            <h3 className="text-sm font-semibold text-fg-strong flex items-center gap-2 mb-2">
              <Rocket className="h-4 w-4 text-accent" /> Best Used For
            </h3>
            <p className="text-fg-soft leading-relaxed">{tool.bestFor}</p>
          </section>

          {/* Features */}
          {tool.features && tool.features.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-fg-soft">
                    <span className="text-accent mt-1">✦</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Strengths & Weaknesses */}
          <div className="grid sm:grid-cols-2 gap-4">
            {tool.strengths && tool.strengths.length > 0 && (
              <section className="rounded-2xl p-4 bg-green-500/10 border border-green-500/30">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">
                  ✅ Strengths
                </h3>
                <ul className="space-y-1">
                  {tool.strengths.slice(0, 5).map((strength, index) => (
                    <li key={index} className="text-sm text-fg-soft flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">▸</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {tool.weaknesses && tool.weaknesses.length > 0 && (
              <section className="rounded-2xl p-4 bg-red-500/10 border border-red-500/30">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">
                  ⚠️ Weaknesses
                </h3>
                <ul className="space-y-1">
                  {tool.weaknesses.slice(0, 5).map((weakness, index) => (
                    <li key={index} className="text-sm text-fg-soft flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">▸</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Use Cases
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.useCases.map((useCase, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Pricing */}
          {tool.pricing && (
            <section className="rounded-2xl p-4 bg-[var(--surface-1)]/60 border border-[var(--surface-border)]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                💰 Pricing
              </h3>
              <p className="text-sm text-fg-soft">{tool.pricing}</p>
            </section>
          )}

          {/* Integrations */}
          {tool.integrations && tool.integrations.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Integrations
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.integrations.map((integration, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-soft"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Alternatives */}
          {tool.alternatives && tool.alternatives.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Alternatives
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.alternatives.map((alt, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-soft"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Capability tags */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              Capability tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-1 rounded-full bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Departments */}
          {tool.departments.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                Recommended for
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.departments.map((d) => (
                  <span
                    key={d}
                    className="text-[11px] px-2 py-1 rounded-full bg-primary/20 border border-primary/40 text-fg-strong"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Enterprise Pick */}
          {highlight && (
            <section className="rounded-2xl p-5 bg-gradient-to-br from-accent/15 to-transparent border border-accent/30">
              <h3 className="text-sm font-semibold text-fg-strong flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-accent" /> Why it's an enterprise pick
              </h3>
              <p className="text-sm text-fg-soft leading-relaxed">
                {tool.name} sits at the intersection of orchestration, intelligence and reliability
                — built to plug into existing corporate ecosystems, scale across teams and remove
                manual friction in high-volume workflows.
              </p>
            </section>
          )}

          {/* Rating and Company Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {tool.rating && (
              <div className="rounded-xl p-3 bg-[var(--surface-1)]/60 border border-[var(--surface-border)] text-center">
                <p className="text-fg-mute">Rating</p>
                <p className="text-accent font-bold text-base">{tool.rating} ⭐</p>
              </div>
            )}
            {tool.founded && (
              <div className="rounded-xl p-3 bg-[var(--surface-1)]/60 border border-[var(--surface-border)] text-center">
                <p className="text-fg-mute">Founded</p>
                <p className="text-fg-strong font-semibold">{tool.founded}</p>
              </div>
            )}
            {tool.headquarters && (
              <div className="rounded-xl p-3 bg-[var(--surface-1)]/60 border border-[var(--surface-border)] text-center">
                <p className="text-fg-mute">HQ</p>
                <p className="text-fg-strong font-semibold truncate">{tool.headquarters}</p>
              </div>
            )}
            <div className="rounded-xl p-3 bg-[var(--surface-1)]/60 border border-[var(--surface-border)] text-center">
              <p className="text-fg-mute">Category</p>
              <p className="text-fg-strong font-semibold truncate">{primary.split(" ").slice(0, 2).join(" ")}</p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-2">
            {tool.website && (
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline text-center py-2 rounded-lg bg-[var(--surface-1)]/60 border border-[var(--surface-border)] hover:border-accent/40 transition-all"
              >
                🌐 Website
              </a>
            )}
            {tool.documentation && (
              <a
                href={tool.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline text-center py-2 rounded-lg bg-[var(--surface-1)]/60 border border-[var(--surface-border)] hover:border-accent/40 transition-all"
              >
                📚 Documentation
              </a>
            )}
            {tool.community && (
              <a
                href={tool.community}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline text-center py-2 rounded-lg bg-[var(--surface-1)]/60 border border-[var(--surface-border)] hover:border-accent/40 transition-all"
              >
                👥 Community
              </a>
            )}
            {tool.support && (
              <a
                href={tool.support}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline text-center py-2 rounded-lg bg-[var(--surface-1)]/60 border border-[var(--surface-border)] hover:border-accent/40 transition-all"
              >
                🆘 Support
              </a>
            )}
          </div>
        </div>

        <div className="mt-7 flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-[var(--background)]/95 backdrop-blur-sm pt-4 border-t border-[var(--surface-border)]">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl font-bold text-center bg-gradient-to-r from-accent to-emerald-400 text-accent-foreground hover:brightness-110 transition-all shadow-[0_15px_40px_-10px_rgba(69,204,66,0.7)] flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" /> Launch {tool.name}
          </a>
          <button
            onClick={onToggle}
            className={`py-3 px-5 rounded-xl font-semibold transition-all ${
              inStack
                ? "bg-[var(--surface-1)] border border-[var(--surface-border-strong)] text-fg-strong hover:bg-[var(--surface-strong-1)]"
                : "bg-[#052b66] text-white hover:brightness-125"
            }`}
          >
            {inStack ? "✓ In My Stack" : "+ Add to My Stack"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Stack Panel ---------- */
function StackPanel({
  stack,
  tools,
  onRemove,
  onClear,
  onClose,
  onViewStack,
}: {
  stack: number[];
  tools: Tool[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onClose: () => void;
  onViewStack: () => void;
}) {
  const selected = tools.filter((t) => stack.includes(t.id));
  const exportText = () => {
    const lines = [
      "MY AUTOMATION STACK",
      "AI Discovery Channel — Powered by eSTUDY South Africa",
      "=".repeat(60),
      "",
      ...selected.map(
        (t, i) =>
          `${i + 1}. ${t.name}${t.vendor ? ` (${t.vendor})` : ""}\n   Category: ${t.categories.join(", ")}\n   Summary: ${t.summary}\n   Benefit: ${t.benefits}\n   Best For: ${t.bestFor}\n   Link: ${t.url}\n`,
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-automation-stack.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  const exportPDF = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<html><head><title>My Automation Stack</title><style>
      body{font-family:Inter,system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 24px;color:#111}
      h1{color:#052b66;margin-bottom:4px}
      .sub{color:#45cc42;font-weight:600;margin-bottom:24px;font-size:13px;letter-spacing:.1em;text-transform:uppercase}
      .tool{border-left:3px solid #45cc42;padding:10px 16px;margin:14px 0;background:#f7fafc;border-radius:6px}
      .name{font-weight:700;color:#052b66;font-size:16px}
      .cat{display:inline-block;font-size:11px;background:#052b66;color:#fff;padding:2px 8px;border-radius:4px;margin-left:8px;text-transform:uppercase}
      .label{font-size:11px;color:#45cc42;font-weight:700;text-transform:uppercase;margin-top:8px}
      p{margin:4px 0;font-size:14px;line-height:1.5}
      a{color:#052b66}
      footer{margin-top:40px;padding-top:16px;border-top:1px solid #eee;color:#666;font-size:12px;text-align:center}
    </style></head><body><h1>My Automation Stack</h1>
    <div class="sub">AI Discovery Channel · ${selected.length} tools curated</div>
    ${selected
      .map(
        (
          t,
        ) => `<div class="tool"><div><span class="name">${t.name}</span>${t.vendor ? ` <span style="color:#666;font-size:13px">— ${t.vendor}</span>` : ""}<span class="cat">${t.categories[0]}</span></div>
    <div class="label">Summary</div><p>${t.summary}</p><div class="label">Benefits</div><p>${t.benefits}</p><div class="label">Best For</div><p>${t.bestFor}</p><div class="label">Link</div><p><a href="${t.url}">${t.url}</a></p></div>`,
      )
      .join("")}
    <footer>Created by the AI Think Tank for eSTUDY South Africa · AI Discovery Channel</footer>
    <script>window.onload=()=>window.print()</script></body></html>`);
    w.document.close();
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 glass-strong border-l border-[var(--surface-border)] flex flex-col animate-fade-in-up">
      <div className="flex items-center justify-between p-5 border-b border-[var(--surface-border)]">
        <div>
          <h3 className="font-bold text-fg-strong flex items-center gap-2">
            <Layers className="h-4 w-4 text-accent" /> My Automation Stack
          </h3>
          <p className="text-xs text-fg-mute mt-0.5">
            {selected.length} {selected.length === 1 ? "tool" : "tools"} selected
          </p>
        </div>
        <button
          onClick={onClose}
          className="grid place-items-center h-9 w-9 rounded-full bg-[var(--surface-1)] hover:bg-[var(--surface-strong-1)] text-fg-strong"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {selected.length === 0 && (
          <button
            onClick={onViewStack}
            className="w-full text-center py-12 px-4 hover:bg-[var(--surface-1)] rounded-2xl transition-all"
          >
            <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-[var(--surface-1)] border border-[var(--surface-border)] mb-3 hover:border-accent hover:bg-[var(--surface-strong-1)] transition-all">
              <Plus className="h-6 w-6 text-fg-mute hover:text-accent" />
            </div>
            <p className="text-sm text-fg-soft">
              No tools yet. Click the <span className="text-accent font-semibold">+</span> button or
              search for tools to add them to your stack.
            </p>
          </button>
        )}
        {selected.map((t) => (
          <div key={t.id} className="glass rounded-xl p-3 flex items-center gap-3">
            <BrandLogo tool={t} size={40} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-fg-strong truncate">{t.name}</p>
              <p className="text-[11px] text-accent truncate">{t.categories[0]}</p>
            </div>
            <button
              onClick={() => onRemove(t.id)}
              className="grid place-items-center h-7 w-7 rounded-lg bg-[var(--surface-1)] hover:bg-destructive/30 text-fg-soft"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      {selected.length > 0 && (
        <div className="p-4 border-t border-[var(--surface-border)] space-y-2">
          <button
            onClick={onViewStack}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110"
          >
            <Rocket className="h-4 w-4" /> Open Stack
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={exportText}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--surface-1)] border border-[var(--surface-border-strong)] text-fg-strong text-sm hover:bg-[var(--surface-strong-1)]"
            >
              <Download className="h-4 w-4" /> .txt
            </button>
            <button
              onClick={exportPDF}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:brightness-110"
            >
              <Download className="h-4 w-4" /> PDF
            </button>
          </div>
          <button
            onClick={onClear}
            className="w-full text-xs text-fg-mute hover:text-fg-strong py-1"
          >
            Clear stack
          </button>
        </div>
      )}
    </aside>
  );
}

/* ---------- Chatbot ---------- */
type ChatMsg = { role: "user" | "bot"; text: string };

function recommendTools(input: string): Tool[] {
  const q = input.toLowerCase();
  const scored = TOOLS.map((t) => {
    let s = 0;
    const hay =
      `${t.name} ${t.categories.join(" ")} ${t.summary} ${t.benefits} ${t.bestFor} ${t.tags.join(" ")} ${t.departments.join(" ")}`.toLowerCase();
    q.split(/\s+/)
      .filter((w) => w.length > 2)
      .forEach((w) => {
        if (hay.includes(w)) s += 1;
        if (t.name.toLowerCase().includes(w)) s += 2;
      });
    const boosts: Array<[RegExp, string[]]> = [
      [/scrap|data\s*pipeline|extract/, ["Gumloop", "n8n"]],
      [/automat|workflow|orchestrat/, ["n8n", "Zapier Agents"]],
      [/video|avatar/, ["HeyGen", "Runway (Gen-3)", "Sora"]],
      [/voice|audio|speech/, ["ElevenLabs", "Lovo.ai"]],
      [/image|design|logo|graphic/, ["Midjourney", "Adobe Firefly", "Canva Magic Studio"]],
      [/code|develop|engineer|refactor/, ["Cursor", "GitHub Copilot", "Lovable"]],
      [/research|paper|study|literature/, ["NotebookLM", "Elicit", "Consensus", "Perplexity AI"]],
      [/meeting|transcrib|note/, ["Otter.ai", "Fireflies.ai"]],
      [/slide|deck|presentation/, ["Gamma", "Beautiful.ai", "Tome"]],
      [/copy|marketing|seo|content/, ["Jasper", "Copy.ai", "Clearscope", "Writer"]],
      [/chatbot|support|whatsapp/, ["Botpress"]],
      [/finance|budget|cost|invoice|account/, ["QuickBooks Advanced AI", "Xero Analytics", "Ramp"]],
      [/crm|sales|pipeline|lead/, ["HubSpot AI", "Salesforce Einstein", "Gong.io"]],
      [/translat|language|grammar/, ["DeepL Pro", "Grammarly Enterprise", "QuillBot"]],
      [/3d|game|unity|unreal/, ["Spline 3D", "Unity Muse", "Unreal Engine Sky"]],
      [/security|privacy|compliance|popia|gdpr/, ["OneTrust", "Darktrace", "Snyk"]],
      [/legal|long\s*document|analy/, ["Claude"]],
    ];
    boosts.forEach(([re, names]) => {
      if (re.test(q) && names.includes(t.name)) s += 5;
    });
    return { t, s };
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  return scored.slice(0, 3).map((x) => x.t);
}

function botReply(input: string): { text: string; tools: Tool[] } {
  const recs = recommendTools(input);
  if (recs.length === 0) {
    return {
      text: "I couldn't pinpoint the perfect match. Try describing the workflow (e.g., 'transcribe meetings', 'generate marketing copy', 'build a chatbot'). I'll cross-reference the eSTUDY Discovery database.",
      tools: [],
    };
  }
  const names = recs.map((t) => t.name);
  const head =
    names.length === 1
      ? names[0]
      : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  return {
    text: `Based on the eSTUDY Discovery database, you should use ${head}. ${recs[0].name} is your strongest fit — ${recs[0].benefits}`,
    tools: recs,
  };
}

function Chatbot({ onOpenTool }: { onOpenTool: (t: Tool) => void }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      role: "bot",
      text: "Hi! I'm the eSTUDY AI Concierge. Describe a workflow bottleneck (e.g. 'I need to scrape websites') and I'll recommend tools from our database.",
    },
  ]);
  const [recsByMsg, setRecsByMsg] = useState<Record<number, Tool[]>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [msgs, open]);

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    const userMsg: ChatMsg = { role: "user", text: q };
    setMsgs((m) => {
      const next = [...m, userMsg];
      setTimeout(() => {
        const reply = botReply(q);
        setMsgs((mm) => {
          const idx = mm.length;
          setRecsByMsg((r) => ({ ...r, [idx]: reply.tools }));
          return [...mm, { role: "bot", text: reply.text }];
        });
      }, 450);
      return next;
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-40 grid place-items-center h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-[0_10px_40px_-10px_rgba(69,204,66,0.7)] hover:scale-105 transition-all animate-pulse-glow"
        aria-label="AI Concierge"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] sm:w-96 h-[70vh] sm:h-[560px] glass-strong rounded-3xl flex flex-col overflow-hidden animate-fade-in-up shadow-2xl">
          <div className="flex items-center gap-3 p-4 border-b border-[var(--surface-border)] bg-gradient-to-r from-primary/30 to-transparent">
            <div className="grid place-items-center h-10 w-10 rounded-xl bg-accent text-accent-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-fg-strong">eSTUDY AI Concierge</p>
              <p className="text-[11px] text-fg-mute">Recommends from 70+ tools</p>
            </div>
            <button
              onClick={() => {
                setMsgs((m) => m.slice(0, 1));
                setRecsByMsg({});
              }}
              className="grid place-items-center h-8 w-8 rounded-lg bg-[var(--surface-1)] hover:bg-[var(--surface-strong-1)] text-fg-soft"
              title="Reset"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] ${m.role === "user" ? "" : "w-full"}`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  {recsByMsg[i] && recsByMsg[i].length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {recsByMsg[i].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => onOpenTool(t)}
                          className="w-full flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-strong-1)] border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all text-left"
                        >
                          <BrandLogo tool={t} size={32} />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-fg-strong truncate">
                              {t.name}
                            </p>
                            <p className="text-[10px] text-fg-mute truncate">{t.categories[0]}</p>
                          </div>
                          <ExternalLink className="h-3 w-3 text-accent" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-[var(--surface-border)] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Describe your workflow problem…"
              className="flex-1 px-3 py-2 rounded-xl bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong placeholder:text-fg-mute outline-none focus:border-accent text-sm"
            />
            <button
              onClick={send}
              className="grid place-items-center h-10 w-10 rounded-xl bg-accent text-accent-foreground hover:brightness-110"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- About Page ---------- */
function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-medium text-fg-soft mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> OUR MISSION
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
          <span className="text-fg-strong">About the </span>
          <span className="text-gradient">Discovery Channel</span>
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-fg-soft leading-relaxed">
          eSTUDY South Africa's leading operational research hub — empowering internal talent with
          cutting-edge digital transformation, B-BBEE aligned skills training, and automation
          force-multipliers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {[
          {
            icon: Sparkles,
            title: "Curated, Not Crowded",
            body: "Every tool in our directory is hand-vetted against enterprise readiness, security posture, and measurable ROI for South African operations.",
          },
          {
            icon: Building2,
            title: "Built for eSTUDY Teams",
            body: "From Finance to Learning Design, each department gets a tailored slice of the AI universe matched to the workflows you actually run.",
          },
          {
            icon: TrendingUp,
            title: "B-BBEE Aligned Skills",
            body: "We pair AI tooling with structured upskilling pathways — accelerating digital transformation while advancing transformation targets.",
          },
          {
            icon: Zap,
            title: "Automation Force-Multipliers",
            body: "Highlighted picks (n8n, Zapier Agents, Gumloop, Cursor) compress days of manual ops into minutes of orchestrated execution.",
          },
        ].map((c, i) => (
          <div key={i} className="glass rounded-2xl p-6 hover:border-accent/40 transition-all">
            <div className="grid place-items-center h-12 w-12 rounded-xl bg-accent/15 text-accent border border-accent/30 mb-3">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-fg-strong mb-2">{c.title}</h3>
            <p className="text-sm text-fg-soft leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 glass-strong rounded-3xl p-8 text-center border border-accent/20">
        <h2 className="text-2xl font-bold text-fg-strong mb-2">Our north star</h2>
        <p className="text-fg-soft max-w-2xl mx-auto leading-relaxed">
          To make AI tooling instantly legible to every eSTUDY professional — so the right tool is
          always one tap, one search, or one conversation away.
        </p>
      </div>
    </main>
  );
}

/* ---------- Types for Trends Page ---------- */
interface FeedPost {
  id: number;
  author: string;
  role: string;
  org: string;
  time: string;
  body: string;
  topic: string;
  reactions: number;
  comments: number;
  url?: string;
}

// Interface for Hacker News API
interface HNStory {
  id: number;
  title: string;
  by: string;
  time: number;
  score: number;
  descendants: number;
  url?: string;
  text?: string;
  type: string;
}

// Interface for Dev.to API
interface DevToArticle {
  id: number;
  title: string;
  description?: string;
  published_at: string;
  positive_reactions_count: number;
  comments_count: number;
  user: {
    name: string;
    username: string;
  };
  tag_list: string[];
  url?: string;
}

// Interface for GitHub API
interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  owner: {
    login: string;
  };
}

// Interface for fallback data items
interface FallbackNewsItem {
  title: string;
  description: string;
  author: string;
  pubDate: string;
  link: string;
}

// AI-related keywords for filtering
const AI_KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'deep learning',
  'neural network', 'gpt', 'claude', 'llm', 'large language model',
  'automation', 'robotics', 'openai', 'anthropic', 'gemini', 'bard',
  'chatgpt', 'copilot', 'cursor', 'n8n', 'zapier', 'agent', 'autonomous',
  'computer vision', 'nlp', 'natural language', 'speech recognition',
  'generative ai', 'stable diffusion', 'midjourney', 'dall-e',
  'ai agent', 'ai assistant', 'intelligent', 'reasoning', 'inference',
  'ml', 'tensorflow', 'pytorch', 'huggingface', 'transformers'
];

/* ---------- Trends Page (LinkedIn-style feed) ---------- */
function TrendsPage() {
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState<string | null>(null);
  const [showSharePopup, setShowSharePopup] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [commentsOpen, setCommentsOpen] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-refresh every 5 minutes (300000 ms)
  const AUTO_REFRESH_INTERVAL = 300000;

  // Helper function to detect topic from title/summary
  function detectTopic(title: string, summary: string): string {
    const text = (title + ' ' + summary).toLowerCase();
    if (text.includes('claude') || text.includes('anthropic')) return 'LLMs';
    if (text.includes('gpt') || text.includes('openai') || text.includes('chatgpt')) return 'LLMs';
    if (text.includes('llm') || text.includes('large language')) return 'LLMs';
    if (text.includes('n8n') || text.includes('zapier') || text.includes('automation')) return 'Workflow Automation';
    if (text.includes('agent') || text.includes('autonomous')) return 'Workflow Automation';
    if (text.includes('code') || text.includes('developer') || text.includes('github') || text.includes('copilot')) return 'Developer Tools';
    if (text.includes('cursor') || text.includes('programming')) return 'Developer Tools';
    if (text.includes('marketing') || text.includes('sales') || text.includes('crm')) return 'Marketing';
    if (text.includes('security') || text.includes('privacy') || text.includes('cyber')) return 'Cybersecurity';
    if (text.includes('education') || text.includes('learn') || text.includes('course')) return 'EdTech';
    if (text.includes('finance') || text.includes('fintech') || text.includes('banking')) return 'FinTech';
    if (text.includes('3d') || text.includes('xr') || text.includes('vr') || text.includes('ar')) return '3D & XR';
    if (text.includes('translation') || text.includes('language')) return 'Translation';
    if (text.includes('research') || text.includes('science')) return 'Market Intelligence';
    if (text.includes('model') || text.includes('training') || text.includes('inference')) return 'LLMs';
    return 'Industry Trends';
  }

  // Source 1: Hacker News filtered for AI
  const fetchHackerNewsAI = useCallback(async (): Promise<FeedPost[]> => {
    try {
      console.log('🟢 Fetching Hacker News AI stories...');
      const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
      const response = await fetch(topStoriesUrl);
      const storyIds: number[] = await response.json();
      
      const top50Ids = storyIds.slice(0, 50);
      
      const storyPromises = top50Ids.map(async (id: number) => {
        const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const res = await fetch(storyUrl);
        return res.json();
      });
      
      const stories: HNStory[] = await Promise.all(storyPromises);
      
      const aiStories = stories.filter((story: HNStory) => {
        if (!story || !story.title || story.type !== 'story') return false;
        const title = story.title.toLowerCase();
        return AI_KEYWORDS.some(keyword => title.includes(keyword));
      });
      
      console.log(`🟢 Hacker News AI stories: ${aiStories.length}`);
      
      return aiStories.slice(0, 15).map((story: HNStory) => ({
        id: story.id,
        author: story.by || 'Hacker News',
        role: 'Tech Community',
        org: 'Hacker News',
        time: story.time ? new Date(story.time * 1000).toLocaleDateString() : 'Just now',
        body: story.title || 'No content available',
        topic: detectTopic(story.title, ''),
        reactions: story.score || Math.floor(Math.random() * 100) + 10,
        comments: story.descendants || Math.floor(Math.random() * 20),
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      }));
    } catch (error) {
      console.error('🔴 Hacker News AI fetch failed:', error);
      return [];
    }
  }, []);

  // Source 2: Dev.to AI articles
  const fetchDevToAI = useCallback(async (): Promise<FeedPost[]> => {
    try {
      console.log('🟢 Fetching Dev.to AI articles...');
      const url = 'https://dev.to/api/articles?tag=ai&per_page=20';
      const response = await fetch(url);
      const articles: DevToArticle[] = await response.json();
      
      console.log(`🟢 Dev.to AI articles: ${articles.length}`);
      
      return articles.map((article: DevToArticle) => ({
        id: article.id + 2000,
        author: article.user?.name || 'Dev.to',
        role: 'Developer Community',
        org: 'Dev.to',
        time: article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Just now',
        body: article.title || 'No content available',
        topic: detectTopic(article.title, article.description || ''),
        reactions: article.positive_reactions_count || Math.floor(Math.random() * 80) + 10,
        comments: article.comments_count || Math.floor(Math.random() * 20),
        url: article.url || `https://dev.to/${article.user?.username}/${article.id}`,
      }));
    } catch (error) {
      console.error('🔴 Dev.to fetch failed:', error);
      return [];
    }
  }, []);

  // Final fallback function
  const getFallbackPosts = useCallback((): FeedPost[] => {
    const fallbackItems: FallbackNewsItem[] = [
      {
        title: 'AI Startup Raises $100M Series C for Enterprise Automation',
        description: 'The company plans to expand its AI-powered workflow automation platform globally.',
        author: 'TechCrunch',
        pubDate: new Date().toISOString(),
        link: '#'
      },
      {
        title: 'New Open-Source LLM Matches GPT-4 Performance',
        description: 'Researchers have developed an open-source language model that rivals commercial alternatives.',
        author: 'Wired',
        pubDate: new Date().toISOString(),
        link: '#'
      },
      {
        title: 'Breakthrough in AI Reasoning Could Transform Enterprise Decision Making',
        description: 'New research shows significant improvements in AI reasoning capabilities.',
        author: 'MIT Technology Review',
        pubDate: new Date().toISOString(),
        link: '#'
      },
      {
        title: 'Top 10 AI Tools for Software Development in 2026',
        description: 'A comprehensive review of the best AI-powered development tools.',
        author: 'ZDNet',
        pubDate: new Date().toISOString(),
        link: '#'
      },
      {
        title: 'AI-Powered CRM Platform Disrupts Salesforce',
        description: 'New AI-native CRM promises autonomous lead management and sales automation.',
        author: 'VentureBeat',
        pubDate: new Date().toISOString(),
        link: '#'
      },
      {
        title: 'Claude 4 Released with Extended Context Window',
        description: 'Anthropic ships Claude 4 with 1M token context and improved reasoning capabilities.',
        author: 'AI Research Lab',
        pubDate: new Date().toISOString(),
        link: '#'
      },
      {
        title: 'n8n Launches AI Agent Builder for Enterprise Workflows',
        description: 'New visual interface for building autonomous agents with drag-and-drop workflow automation.',
        author: 'Workflow Automation Team',
        pubDate: new Date().toISOString(),
        link: '#'
      },
      {
        title: 'OpenAI Announces GPT-5 Enterprise with Enhanced Security',
        description: 'New enterprise features for large-scale deployments with enhanced security and compliance.',
        author: 'Tech Blog',
        pubDate: new Date().toISOString(),
        link: '#'
      }
    ];

    return fallbackItems.slice(0, 15).map((item: FallbackNewsItem, index: number) => ({
      id: index + 5000,
      author: item.author || 'Tech News',
      role: 'Industry Expert',
      org: 'TechCrunch',
      time: item.pubDate ? new Date(item.pubDate).toLocaleDateString() : 'Just now',
      body: item.description || item.title || 'No content available',
      topic: detectTopic(item.title, item.description || ''),
      reactions: Math.floor(Math.random() * 100) + 10,
      comments: Math.floor(Math.random() * 20),
      url: item.link || '#',
    }));
  }, []);

  // Fetch live data from multiple AI-focused sources
  const fetchTrends = useCallback(async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      console.log('🟢 Fetching AI-focused news...');
      
      // Try multiple sources in parallel
      const sources = [
        fetchHackerNewsAI(),
        fetchDevToAI()
      ];
      
      const results = await Promise.allSettled(sources);
      
      // Combine all successful results
      let allPosts: FeedPost[] = [];
      
      for (const result of results) {
        if (result.status === 'fulfilled' && result.value.length > 0) {
          allPosts = allPosts.concat(result.value);
        }
      }
      
      // Remove duplicates by title
      const seenTitles = new Set<string>();
      const uniquePosts = allPosts.filter((post) => {
        const key = post.body.toLowerCase().trim();
        if (seenTitles.has(key)) return false;
        seenTitles.add(key);
        return true;
      });
      
      // Sort by date (newest first) and limit to 20
      const sortedPosts = uniquePosts
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 20);
      
      if (sortedPosts.length > 0) {
        console.log(`✅ AI news loaded: ${sortedPosts.length} articles`);
        setFeedPosts(sortedPosts);
      } else {
        console.warn('⚠️ No AI news found, using fallback');
        setFeedPosts(getFallbackPosts());
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('🔴 Failed to fetch AI news:', error);
      setFeedPosts(getFallbackPosts());
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  }, [isRefreshing, fetchHackerNewsAI, fetchDevToAI, getFallbackPosts]);

  // Initial fetch only - runs once on mount
  useEffect(() => {
    fetchTrends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh setup - runs once on mount
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTrends();
    }, AUTO_REFRESH_INTERVAL);
    
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual refresh handler
  const handleManualRefresh = () => {
    if (!isRefreshing) {
      fetchTrends();
    }
  };

  // Format the last updated time
  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  const topics = useMemo(() => 
    Array.from(new Set(feedPosts.map((p) => p.topic))), 
    [feedPosts]
  );
  
  const posts = topic ? feedPosts.filter((p) => p.topic === topic) : feedPosts;

  // Handle share
  const handleShare = (post: FeedPost) => {
    setShowSharePopup(post.id);
    setTimeout(() => setShowSharePopup(null), 3000);
  };

  // Handle copy link
  const handleCopyLink = (post: FeedPost) => {
    const url = post.url || window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Handle comment toggle
  const handleCommentToggle = (postId: number) => {
    setCommentsOpen(commentsOpen === postId ? null : postId);
  };

  // Loading state - only on initial load
  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-medium text-fg-soft mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> LOADING AI NEWS
          </div>
          <h1 className="text-4xl sm:text-5xl font-black">
            <span className="text-fg-strong">AI Trends </span>
            <span className="text-gradient">Hub</span>
          </h1>
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-5 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-medium text-fg-soft mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> AI NEWS FEED
        </div>
        <h1 className="text-4xl sm:text-5xl font-black">
          <span className="text-fg-strong">AI Trends </span>
          <span className="text-gradient">Hub</span>
        </h1>
        <p className="mt-3 text-fg-soft max-w-xl mx-auto">
          Curated AI news from Hacker News and Dev.to communities.
        </p>
        <div className="mt-2 text-xs text-fg-mute flex items-center justify-center gap-3">
          <span>{feedPosts.length > 0 ? `Showing ${feedPosts.length} AI trends` : 'No trends available'}</span>
          <span className="w-px h-3 bg-fg-mute/30" />
          <span>Updated {getTimeAgo(lastUpdated)}</span>
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-1 text-accent hover:underline transition-all ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className={`inline-block transition-transform ${isRefreshing ? 'animate-spin' : ''}`}>
              <span className="text-sm">⟳</span>
            </span>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="glass-strong rounded-2xl p-3 mb-5 flex flex-wrap gap-1.5 sticky top-[72px] z-20">
        <button
          onClick={() => setTopic(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${!topic ? "bg-accent text-accent-foreground border-accent" : "bg-[var(--surface-1)] border-[var(--surface-border)] text-fg-soft hover:border-accent"}`}
        >
          All Topics
        </button>
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(topic === t ? null : t)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${topic === t ? "bg-primary text-primary-foreground border-primary" : "bg-[var(--surface-1)] border-[var(--surface-border)] text-fg-soft hover:border-primary"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((p) => (
            <FeedCard 
              key={p.id} 
              post={p} 
              onShare={() => handleShare(p)}
              onCopyLink={() => handleCopyLink(p)}
              onCommentToggle={() => handleCommentToggle(p.id)}
              isCommentsOpen={commentsOpen === p.id}
              showSharePopup={showSharePopup === p.id}
              copiedId={copiedId === p.id}
            />
          ))
        ) : (
          <div className="glass rounded-2xl p-10 text-center">
            <p className="text-fg-soft">No AI posts in this topic yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}

/* ---------- Feed Card Component ---------- */
function FeedCard({ 
  post, 
  onShare, 
  onCopyLink, 
  onCommentToggle,
  isCommentsOpen,
  showSharePopup,
  copiedId,
}: { 
  post: FeedPost;
  onShare: () => void;
  onCopyLink: () => void;
  onCommentToggle: () => void;
  isCommentsOpen: boolean;
  showSharePopup: boolean;
  copiedId: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  
  const init = post.author
    .split(" ")
    .slice(0, 2)
    .map((s: string) => s[0])
    .join("")
    .toUpperCase();

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  return (
    <article className="glass rounded-2xl p-5 hover:border-accent/30 transition-all relative">
      <header className="flex items-start gap-3">
        <div className="grid place-items-center h-12 w-12 rounded-full bg-gradient-to-br from-[#052b66] to-[#1a4ba0] text-white font-bold border-2 border-accent/30 shrink-0">
          {init}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-fg-strong truncate">{post.author}</p>
          <p className="text-xs text-fg-soft truncate">
            {post.role} · {post.org}
          </p>
          <p className="text-[11px] text-fg-mute mt-0.5">{post.time} · 🌐</p>
        </div>
        <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-accent/15 text-accent border border-accent/30 shrink-0">
          {post.topic}
        </span>
      </header>
      
      <p className="mt-4 text-fg-strong leading-relaxed whitespace-pre-line">{post.body}</p>
      
      {post.url && post.url !== '#' && (
        <a 
          href={post.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs text-accent hover:underline block mt-2 flex items-center gap-1"
        >
          <ExternalLink className="h-3 w-3" /> Read full article
        </a>
      )}
      
      <div className="mt-4 flex items-center justify-between text-xs text-fg-mute pb-2 border-b border-[var(--surface-border)]">
        <span className="flex items-center gap-1">
          <span className="grid place-items-center h-4 w-4 rounded-full bg-accent text-accent-foreground">
            <ThumbsUp className="h-2.5 w-2.5" />
          </span>
          {post.reactions + (liked ? 1 : 0)}
        </span>
        <span>{post.comments + comments.length} comments</span>
      </div>
      
      <div className="mt-2 grid grid-cols-3 gap-1">
        <button
          onClick={() => setLiked((l) => !l)}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${liked ? "text-accent bg-accent/10" : "text-fg-soft hover:bg-[var(--surface-1)]"}`}
        >
          <ThumbsUp className="h-3.5 w-3.5" /> Like
        </button>
        <button
          onClick={onCommentToggle}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-fg-soft hover:bg-[var(--surface-1)] transition-all"
        >
          <MessageSquare className="h-3.5 w-3.5" /> Comment
        </button>
        <div className="relative">
          <button
            onClick={onShare}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-fg-soft hover:bg-[var(--surface-1)] transition-all w-full"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
          {showSharePopup && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass-strong rounded-xl p-2 shadow-xl z-10 flex gap-1">
              <button
                onClick={onCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[var(--surface-1)] transition-all"
              >
                {copiedId ? <CheckIcon className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedId ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={() => {
                  if (post.url && post.url !== '#') {
                    window.open(post.url, '_blank');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[var(--surface-1)] transition-all"
                disabled={!post.url || post.url === '#'}
              >
                <ExternalLink className="h-3.5 w-3.5" /> Open
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      {isCommentsOpen && (
        <div className="mt-4 pt-4 border-t border-[var(--surface-border)] space-y-3">
          <div className="flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 rounded-xl bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong placeholder:text-fg-mute outline-none focus:border-accent text-sm"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:brightness-110 transition-all"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          {comments.length > 0 && (
            <div className="space-y-2">
              {comments.map((comment, index) => (
                <div key={index} className="bg-[var(--surface-1)] rounded-xl p-3 text-sm text-fg-soft">
                  <span className="text-accent font-semibold">You: </span>
                  {comment}
                </div>
              ))}
            </div>
          )}
          {comments.length === 0 && (
            <p className="text-xs text-fg-mute text-center">No comments yet. Be the first!</p>
          )}
        </div>
      )}
    </article>
  );
}

/* ---------- Compare Page ---------- */
function ComparePage({
  tools,
  compare,
  onToggle,
  onClear,
}: {
  tools: Tool[];
  compare: number[];
  onToggle: (id: number) => void;
  onClear: () => void;
}) {
  const [search, setSearch] = useState("");
  const selected = tools.filter((t) => compare.includes(t.id));
  const list = tools.filter((t) => t.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-black">
          <span className="text-fg-strong">Side-by-side </span>
          <span className="text-gradient">Compare</span>
        </h1>
        <p className="mt-3 text-fg-soft max-w-xl mx-auto">
          Select up to 4 tools to compare their capabilities, tags, and fit.
        </p>
      </div>

      <div className="glass-strong rounded-2xl p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-mute" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Add a tool to comparison…"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong placeholder:text-fg-mute outline-none focus:border-accent"
          />
        </div>
        {search && (
          <div className="mt-3 flex flex-wrap gap-2">
            {list.map((t) => {
              const on = compare.includes(t.id);
              const full = compare.length >= 4 && !on;
              return (
                <button
                  key={t.id}
                  disabled={full}
                  onClick={() => onToggle(t.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all ${on ? "bg-accent text-accent-foreground border-accent" : "bg-[var(--surface-1)] border-[var(--surface-border)] text-fg-strong hover:border-accent disabled:opacity-40"}`}
                >
                  {on ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />} {t.name}
                </button>
              );
            })}
          </div>
        )}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-fg-mute">{selected.length} / 4 selected</p>
          {selected.length > 0 && (
            <button onClick={onClear} className="text-xs text-accent hover:underline">
              Clear all
            </button>
          )}
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <GitCompare className="h-10 w-10 text-fg-mute mx-auto mb-3" />
          <p className="text-fg-soft">
            Search above or use the compare button on any tool card to begin.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div
            className="grid gap-4 min-w-max"
            style={{ gridTemplateColumns: `180px repeat(${selected.length}, minmax(240px, 1fr))` }}
          >
            <div />
            {selected.map((t) => (
              <div key={t.id} className="glass-strong rounded-2xl p-5 relative">
                <button
                  onClick={() => onToggle(t.id)}
                  className="absolute top-2 right-2 grid place-items-center h-7 w-7 rounded-full bg-[var(--surface-1)] hover:bg-destructive/30 text-fg-soft"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <BrandLogo tool={t} size={56} />
                <h3 className="mt-3 font-bold text-fg-strong">{t.name}</h3>
                {t.vendor && <p className="text-xs text-fg-mute">{t.vendor}</p>}
              </div>
            ))}

            {[
              ["Categories", (t: Tool) => t.categories.join(" · ")],
              ["Summary", (t: Tool) => t.summary],
              ["Benefits", (t: Tool) => t.benefits],
              ["Best Used For", (t: Tool) => t.bestFor],
              ["Tags", (t: Tool) => t.tags.join(" · ")],
              ["Departments", (t: Tool) => t.departments.join(", ") || "—"],
              ["Enterprise Pick", (t: Tool) => (ENTERPRISE_HIGHLIGHTS.has(t.name) ? "★ Yes" : "—")],
            ].map(([label, fn]) => (
              <FieldRow
                key={label as string}
                label={label as string}
                selected={selected}
                render={fn as (t: Tool) => string}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function StackBuilderPage({
  tools,
  stack,
  selection,
  onToggleSelection,
  onAddSelected,
  onClearSelection,
  onBack,
}: {
  tools: Tool[];
  stack: number[];
  selection: number[];
  onToggleSelection: (id: number) => void;
  onAddSelected: () => void;
  onClearSelection: () => void;
  onBack: () => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      tools.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.summary.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
      ),
    [search, tools],
  );
  const selectedTools = tools.filter((t) => selection.includes(t.id));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-1)] text-fg-strong border border-[var(--surface-border)] hover:bg-[var(--surface-strong-1)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to tools
          </button>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black">
            <span className="text-fg-strong">Build your </span>
            <span className="text-gradient">AI stack</span>
          </h1>
          <p className="mt-3 max-w-2xl text-fg-soft">
            Select the tools you want in your stack, then review and add them together.
          </p>
        </div>

        <div className="grid gap-3 sm:auto-cols-min sm:grid-flow-col">
          <button
            onClick={onClearSelection}
            className="rounded-2xl px-4 py-3 bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong hover:bg-[var(--surface-strong-1)]"
          >
            Clear selection
          </button>
          <button
            onClick={onAddSelected}
            disabled={selection.length === 0}
            className="rounded-2xl px-4 py-3 bg-accent text-accent-foreground font-semibold hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Add {selection.length} selected to stack
          </button>
        </div>
      </div>

      <div className="glass-strong rounded-3xl p-5 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-mute" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools to add…"
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong placeholder:text-fg-mute outline-none focus:border-accent"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm text-fg-soft">
          <span className="rounded-full bg-[var(--surface-1)] px-3 py-1 border border-[var(--surface-border)]">
            {stack.length} tools already in stack
          </span>
          <span className="rounded-full bg-[var(--surface-1)] px-3 py-1 border border-[var(--surface-border)]">
            {selection.length} selected for addition
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((tool) => {
          const selected = selection.includes(tool.id);
          const inStack = stack.includes(tool.id);
          return (
            <div key={tool.id} className="glass rounded-3xl p-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <BrandLogo tool={tool} size={48} />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold text-fg-strong">{tool.name}</h2>
                  <p className="text-[11px] text-accent truncate">{tool.categories[0]}</p>
                </div>
              </div>
              <p className="text-sm text-fg-soft line-clamp-3">{tool.summary}</p>
              <div className="flex flex-wrap gap-2">
                {tool.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-1 rounded-full bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-mute"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onToggleSelection(tool.id)}
                className={`mt-auto rounded-2xl px-4 py-3 font-semibold transition-all ${
                  selected
                    ? "bg-accent text-accent-foreground"
                    : "bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong hover:bg-[var(--surface-strong-1)]"
                }`}
              >
                {selected ? "Selected" : inStack ? "Already in stack" : "Select"}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function FieldRow({
  label,
  selected,
  render,
}: {
  label: string;
  selected: Tool[];
  render: (t: Tool) => string;
}) {
  return (
    <>
      <div className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-accent self-center">
        {label}
      </div>
      {selected.map((t) => (
        <div key={t.id} className="glass rounded-xl p-4 text-sm text-fg-soft leading-relaxed">
          {render(t)}
        </div>
      ))}
    </>
  );
}

/* ---------- Contact Page ---------- */
const CONTACT_EMAILS = ["lesedi@estudysa.co.za", "Katlego.m@estudysa.co.za"];

function ContactPage() {
  const [form, setForm] = useState({ name: "", dept: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[AI Discovery Channel] ${form.subject || "Inquiry"}`);
    const body = encodeURIComponent(
      `New message from the AI Discovery Channel\n\n` +
        `Name: ${form.name}\n` +
        `Department: ${form.dept}\n` +
        `Email: ${form.email}\n\n` +
        `Message:\n${form.message}\n\n` +
        `— Dispatched to: The AI Think Tank (${CONTACT_EMAILS.join(", ")})`,
    );
    const mailto = `mailto:${CONTACT_EMAILS.join(",")}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 6000);
    setForm({ name: "", dept: "", email: "", subject: "", message: "" });
  };
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-black">
          <span className="text-fg-strong">Get in </span>
          <span className="text-gradient">touch</span>
        </h1>
        <p className="mt-3 text-fg-soft max-w-xl mx-auto">
          Report a platform issue or request a new tool addition. Messages route directly to{" "}
          <span className="text-accent font-semibold">The AI Think Tank</span>.
        </p>
      </div>

      <form onSubmit={submit} className="glass-strong rounded-3xl p-7 space-y-4">
        {sent && (
          <div className="rounded-xl bg-accent/15 border border-accent/40 p-3 text-sm text-fg-strong flex items-center gap-2">
            <Check className="h-4 w-4 text-accent" /> Message dispatched to{" "}
            <span className="text-accent font-semibold">The AI Think Tank</span> — we'll reply
            shortly.
          </div>
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Full name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            required
          />
          <SelectField
            label="eSTUDY Department"
            value={form.dept}
            onChange={(v) => setForm({ ...form, dept: v })}
            options={[...DEPARTMENTS, "Other / Executive"]}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Work email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            required
          />
          <Field
            label="Subject"
            value={form.subject}
            onChange={(v) => setForm({ ...form, subject: v })}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-fg-soft mb-2">
            Message
          </label>
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={6}
            placeholder="Describe the issue, question, or tool suggestion…"
            className="w-full px-4 py-3 rounded-xl bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong placeholder:text-fg-mute outline-none focus:border-accent resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          <Send className="h-4 w-4" /> Send message
        </button>
        <p className="text-[11px] text-fg-mute text-center">
          Your message is routed to{" "}
          <span className="text-accent font-semibold">The AI Think Tank</span>.
        </p>
      </form>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-fg-soft mb-2">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong placeholder:text-fg-mute outline-none focus:border-accent"
      />
    </div>
  );
}
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-fg-soft mb-2">
        {label}
      </label>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-1)] border border-[var(--surface-border)] text-fg-strong outline-none focus:border-accent"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-background text-fg-strong">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------- Header / Nav ---------- */
function Header({
  page,
  setPage,
  theme,
  toggleTheme,
  stackCount,
  onStack,
  onFilters,
}: {
  page: Page;
  setPage: (p: Page) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  stackCount: number;
  onStack: () => void;
  onFilters: () => void;
}) {
  const nav: { key: Page; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "home", label: "Home", icon: HomeIcon },
    { key: "trends", label: "Trends", icon: Newspaper },
    { key: "compare", label: "Compare", icon: GitCompare },
    { key: "about", label: "About", icon: Info },
    { key: "contact", label: "Contact", icon: Mail },
  ];
  return (
    <header className="sticky top-0 z-50 bg-[#052b66] border-b border-[#0a3d8a] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <button onClick={() => setPage("home")} className="flex items-center gap-3 min-w-0 shrink-0">
          <div className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-accent to-emerald-400 text-accent-foreground shadow-[0_0_20px_rgba(69,204,66,0.4)]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0 text-left hidden sm:block">
            <p className="text-sm font-bold text-white truncate">AI Discovery Channel</p>
            <p className="text-[10px] text-white/60 tracking-wider truncate">
              POWERED BY eSTUDY SOUTH AFRICA
            </p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => setPage(n.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                page === n.key
                  ? "bg-accent text-accent-foreground shadow-[0_4px_15px_rgba(69,204,66,0.4)]"
                  : "text-white/75 hover:text-white hover:bg-white/10"
              }`}
            >
              <n.icon className="h-3.5 w-3.5" /> {n.label}
            </button>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid place-items-center h-10 w-10 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {page === "home" && (
            <button
              onClick={onFilters}
              className="lg:hidden grid place-items-center h-10 w-10 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20"
              aria-label="Filters"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onStack}
            className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all shadow-[0_8px_24px_-8px_rgba(69,204,66,0.6)]"
          >
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">My Stack</span>
            <span className="grid place-items-center h-5 min-w-5 px-1 rounded-full bg-[#052b66] text-white text-[11px] font-bold">
              {stackCount}
            </span>
          </button>
        </div>
      </div>

      <nav className="md:hidden border-t border-white/10 px-2 py-2 flex items-center justify-around bg-[#041f4a]">
        {nav.map((n) => (
          <button
            key={n.key}
            onClick={() => setPage(n.key)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] transition-all ${
              page === n.key ? "text-accent" : "text-white/60"
            }`}
          >
            <n.icon className="h-4 w-4" /> {n.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

/* ---------- Main App ---------- */
export function AIDiscoveryApp() {
  const { theme, toggle } = useTheme();
  const [page, setPage] = useState<Page>("home");
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<Category | null>(null);
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [activeDept, setActiveDept] = useState<Department | null>(null);
  const [stack, setStack] = useState<number[]>([]);
  const [stackSelection, setStackSelection] = useState<number[]>([]);
  const [compare, setCompare] = useState<number[]>([]);
  const [openTool, setOpenTool] = useState<Tool | null>(null);
  const [stackOpen, setStackOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const earthRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((t) => {
      if (activeCat && !t.categories.includes(activeCat)) return false;
      if (activeDept && !t.departments.includes(activeDept)) return false;
      if (activeTags.length && !activeTags.every((tag) => t.tags.includes(tag))) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.vendor?.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.benefits.toLowerCase().includes(q) ||
        t.bestFor.toLowerCase().includes(q) ||
        t.categories.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [query, activeCat, activeTags, activeDept]);

  const counts = useMemo(() => {
    const m = new Map<Category, number>();
    CATEGORIES.forEach((c) => m.set(c.key, 0));
    TOOLS.forEach((t) => t.categories.forEach((c) => m.set(c, (m.get(c) || 0) + 1)));
    return m;
  }, []);

  const trending = useMemo(
    () => TRENDING.map((n) => TOOLS.find((t) => t.name === n)).filter(Boolean) as Tool[],
    [],
  );

  const addToStack = (id: number) => setStack((s) => (s.includes(id) ? s : [...s, id]));
  const toggleStack = (id: number) =>
    setStack((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const startStackBuilder = (id?: number) => {
    setStackSelection((s) => (id === undefined ? s : s.includes(id) ? s : [...s, id]));
    setPage("stack");
  };
  const toggleTag = (tag: Tag) =>
    setActiveTags((s) => (s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]));
  const toggleCompare = (id: number) =>
    setCompare((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : s.length >= 4 ? s : [...s, id],
    );

  const handleScroll = useCallback(() => {
    if (!earthRef.current) return;
    const rotation = window.scrollY * 0.14;
    earthRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div ref={earthRef} className="earth-scroll-planet" aria-hidden="true" />
      <Header
        page={page}
        setPage={setPage}
        theme={theme}
        toggleTheme={toggle}
        stackCount={stack.length}
        onStack={() => setStackOpen(true)}
        onFilters={() => setFiltersOpen((v) => !v)}
      />

      {page === "about" && <AboutPage />}
      {page === "trends" && <TrendsPage />}
      {page === "contact" && <ContactPage />}
      {page === "compare" && (
        <ComparePage
          tools={TOOLS}
          compare={compare}
          onToggle={toggleCompare}
          onClear={() => setCompare([])}
        />
      )}

      {page === "stack" && (
        <StackBuilderPage
          tools={TOOLS}
          stack={stack}
          selection={stackSelection}
          onToggleSelection={(id) =>
            setStackSelection((s) =>
              s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
            )
          }
          onAddSelected={() => {
            setStack((s) => [...s, ...stackSelection.filter((id) => !s.includes(id))]);
            setStackSelection([]);
          }}
          onClearSelection={() => setStackSelection([])}
          onBack={() => setPage("home")}
        />
      )}

      {page === "home" && (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-medium text-fg-soft mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                CURATED AI RESEARCH HUB
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
                <span className="text-fg-strong">AI Discovery</span>{" "}
                <span className="text-gradient">Channel</span>
              </h1>
              <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-fg-soft leading-relaxed">
                eSTUDY South Africa's expert directory of 100+ enterprise-grade AI tools  engineered
                to help your teams discover, compare, and assemble the perfect automation stack.
              </p>

              <div className="mt-9 max-w-2xl mx-auto">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-fg-mute group-focus-within:text-accent transition-colors" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, expertise, or keyword…"
                    className="w-full pl-14 pr-5 py-4 rounded-2xl glass-strong text-fg-strong placeholder:text-fg-mute outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(69,204,66,0.15)] transition-all text-base"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center h-7 w-7 rounded-full bg-[var(--surface-strong-1)] text-fg-soft hover:bg-[var(--surface-strong-2)]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
                {[
                  { value: TOOLS.length, label: "Curated Tools" },
                  { value: CATEGORIES.length, label: "Business Dimensions" },
                  { value: filtered.length, label: "Matching Now" },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-2xl p-4 sm:p-5">
                    <div className="text-2xl sm:text-4xl font-black text-gradient">{s.value}</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-fg-mute mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trending feed */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-fg-strong flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" /> Popular Tools
              </h2>
              <span className="text-xs text-fg-mute">Updated weekly</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
              {trending.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setOpenTool(t)}
                  className="snap-start shrink-0 w-56 glass rounded-2xl p-4 text-left hover:border-accent/40 hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <BrandLogo tool={t} size={44} />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-fg-strong truncate">{t.name}</p>
                      <p className="text-[11px] text-accent truncate">{t.categories[0]}</p>
                    </div>
                    <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                  </div>
                  <p className="mt-2 text-xs text-fg-soft line-clamp-2">{t.summary}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Department filter strip */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
            <div className="glass-strong rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-accent" />
                <p className="text-xs font-bold uppercase tracking-wider text-fg-strong">
                  Filter by eSTUDY Department
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveDept(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    !activeDept
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-[var(--surface-1)] border-[var(--surface-border)] text-fg-soft hover:border-accent"
                  }`}
                >
                  All Departments
                </button>
                {DEPARTMENTS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveDept(activeDept === d ? null : d)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      activeDept === d
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(5,43,102,0.4)]"
                        : "bg-[var(--surface-1)] border-[var(--surface-border)] text-fg-soft hover:border-primary"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Main grid */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
            <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-6">
              <aside
                className={`${filtersOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-[88px] lg:self-start`}
                style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
              >
                <div className="glass-strong rounded-2xl p-4 space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-3 px-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-fg-strong flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5 text-accent" /> Categories
                      </h3>
                      {activeCat && (
                        <button
                          onClick={() => setActiveCat(null)}
                          className="text-[11px] text-accent hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => setActiveCat(null)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                          !activeCat
                            ? "bg-[var(--surface-strong-1)] border border-[var(--surface-border-strong)] text-fg-strong"
                            : "border border-transparent hover:bg-[var(--surface-1)] text-fg-soft"
                        }`}
                      >
                        <span className="grid place-items-center h-8 w-8 rounded-lg bg-[var(--surface-1)]">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-sm font-medium">All Tools</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--surface-strong-1)] text-fg-mute">
                          {TOOLS.length}
                        </span>
                      </button>
                      {CATEGORIES.map((c) => (
                        <CategoryPill
                          key={c.key}
                          cat={c.key}
                          active={activeCat === c.key}
                          count={counts.get(c.key) || 0}
                          onClick={() => setActiveCat(activeCat === c.key ? null : c.key)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-[var(--surface-border)] pt-4">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-fg-strong">
                        Capabilities
                      </h3>
                      {activeTags.length > 0 && (
                        <button
                          onClick={() => setActiveTags([])}
                          className="text-[11px] text-accent hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {TAGS.map((t) => (
                        <TagPill
                          key={t}
                          tag={t}
                          active={activeTags.includes(t)}
                          onClick={() => toggleTag(t)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              <section>
                <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                  <p className="text-sm text-fg-soft">
                    Showing <span className="text-fg-strong font-semibold">{filtered.length}</span>{" "}
                    of {TOOLS.length} tools
                    {activeCat && <span className="ml-2 text-accent">· {activeCat}</span>}
                    {activeDept && <span className="ml-2 text-accent">· {activeDept}</span>}
                  </p>
                  {compare.length > 0 && (
                    <button
                      onClick={() => setPage("compare")}
                      className="text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:brightness-110"
                    >
                      <GitCompare className="h-3.5 w-3.5" /> Compare {compare.length}
                    </button>
                  )}
                </div>
                {filtered.length === 0 ? (
                  <div className="glass rounded-2xl p-12 text-center">
                    <p className="text-fg-soft">No tools match your filters.</p>
                    <button
                      onClick={() => {
                        setQuery("");
                        setActiveCat(null);
                        setActiveTags([]);
                        setActiveDept(null);
                      }}
                      className="mt-3 text-sm text-accent hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((t) => (
                      <ToolCard
                        key={t.id}
                        tool={t}
                        inStack={stack.includes(t.id)}
                        onAdd={() => addToStack(t.id)}
                        onOpen={() => setOpenTool(t)}
                        showCompare
                        compareSelected={compare.includes(t.id)}
                        onToggleCompare={() => toggleCompare(t.id)}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-[var(--surface-border)] glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid sm:grid-cols-[minmax(0,1fr)_auto] gap-4 items-center">
          <div>
            <p className="text-sm font-bold text-fg-strong">AI Discovery Channel</p>
            <p className="text-xs text-fg-mute mt-1">
              A curated enterprise AI directory · Powered by{" "}
              <span className="text-accent font-semibold">eSTUDY South Africa</span>
            </p>
            <p className="text-xs text-fg-soft mt-2 font-medium">
              Created by the <span className="text-accent font-semibold">AI Think Tank</span> for
              eSTUDY South Africa
            </p>
          </div>
          <p className="text-[11px] text-fg-mute uppercase tracking-wider">
            © {new Date().getFullYear()} eSTUDY · All rights reserved
          </p>
        </div>
      </footer>

      {/* Overlays */}
      {openTool && (
        <ToolModal
          tool={openTool}
          inStack={stack.includes(openTool.id)}
          onToggle={() => toggleStack(openTool.id)}
          onClose={() => setOpenTool(null)}
        />
      )}
      {stackOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={() => setStackOpen(false)}
          />
          <StackPanel
            stack={stack}
            tools={TOOLS}
            onRemove={(id) => setStack((s) => s.filter((x) => x !== id))}
            onClear={() => setStack([])}
            onClose={() => setStackOpen(false)}
            onViewStack={() => {
              setStackSelection([]);
              setPage("stack");
              setStackOpen(false);
            }}
          />
        </>
      )}

      <Chatbot
        onOpenTool={(t) => {
          setOpenTool(t);
        }}
      />
    </div>
  );
}