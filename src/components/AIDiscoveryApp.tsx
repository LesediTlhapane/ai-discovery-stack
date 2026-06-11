import { useMemo, useState } from "react";
import {
  Search, Sparkles, Filter, X, Plus, Check, Download, ExternalLink,
  Brain, Code2, Telescope, Palette, Clapperboard, Workflow, Menu, Zap, Layers,
} from "lucide-react";
import { CATEGORIES, TAGS, TOOLS, ENTERPRISE_HIGHLIGHTS, type Tool, type Category, type Tag } from "@/lib/tools-data";

const CAT_ICONS: Record<Category, React.ComponentType<{ className?: string }>> = {
  "LLMs & Text": Brain,
  "Coding & Dev": Code2,
  "Search & Research": Telescope,
  "Visual & Image": Palette,
  "Video, Audio & Avatar": Clapperboard,
  "Productivity & Automation": Workflow,
};

function initials(name: string) {
  return name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").slice(0, 2).map(s => s[0]).join("").toUpperCase();
}

function TagPill({ tag, active, onClick }: { tag: Tag; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all duration-200 ${
        active
          ? "bg-accent text-accent-foreground border-accent shadow-[0_0_15px_rgba(69,204,66,0.4)]"
          : "border-white/15 text-white/70 hover:border-accent/60 hover:text-white"
      }`}
    >
      {tag}
    </button>
  );
}

function CategoryPill({ cat, active, count, onClick }: { cat: Category; active: boolean; count: number; onClick: () => void }) {
  const Icon = CAT_ICONS[cat];
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
        active
          ? "bg-accent/15 border border-accent/40 text-white shadow-[0_0_20px_rgba(69,204,66,0.15)]"
          : "border border-transparent hover:bg-white/5 text-white/75"
      }`}
    >
      <span className={`grid place-items-center h-8 w-8 rounded-lg ${active ? "bg-accent text-accent-foreground" : "bg-white/5 text-white/70 group-hover:bg-white/10"}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-sm font-medium leading-tight">{CATEGORIES.find(c => c.key === cat)?.label}</span>
      <span className={`text-[11px] px-2 py-0.5 rounded-full ${active ? "bg-accent text-accent-foreground" : "bg-white/10 text-white/60"}`}>{count}</span>
    </button>
  );
}

function ToolCard({ tool, inStack, onAdd, onOpen }: { tool: Tool; inStack: boolean; onAdd: () => void; onOpen: () => void }) {
  const highlight = ENTERPRISE_HIGHLIGHTS.has(tool.name);
  return (
    <div className="group relative glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_-20px_rgba(69,204,66,0.35)] animate-fade-in-up">
      {highlight && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-accent to-emerald-400 text-accent-foreground shadow-lg">
          <Zap className="h-3 w-3" /> ENTERPRISE PICK
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className="grid place-items-center h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-[#052b66] to-[#1a4ba0] text-white font-bold text-sm border border-white/10">
          {initials(tool.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-semibold text-white">{tool.name}</h3>
            <button
              onClick={onAdd}
              aria-label="Add to stack"
              className={`shrink-0 grid place-items-center h-7 w-7 rounded-lg transition-all duration-200 ${
                inStack ? "bg-accent text-accent-foreground" : "bg-white/5 text-white/70 hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {inStack ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
          {tool.vendor && <p className="text-[11px] text-white/50 truncate">{tool.vendor}</p>}
        </div>
      </div>

      <div className="mt-3">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/15 text-accent border border-accent/30">
          {tool.category}
        </span>
      </div>

      <p className="mt-3 text-sm text-white/75 leading-relaxed line-clamp-3">{tool.field}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.tags.map(t => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">{t}</span>
        ))}
      </div>

      <button
        onClick={onOpen}
        className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-accent/40 transition-all"
      >
        Learn more <ExternalLink className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function ToolModal({ tool, onClose, inStack, onToggle }: { tool: Tool; onClose: () => void; inStack: boolean; onToggle: () => void }) {
  const Icon = CAT_ICONS[tool.category];
  const highlight = ENTERPRISE_HIGHLIGHTS.has(tool.name);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 animate-fade-in-up" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        onClick={e => e.stopPropagation()}
        className="relative glass-strong rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-7"
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 grid place-items-center h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-white">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="grid place-items-center h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#052b66] to-[#1a4ba0] text-white font-bold text-lg border border-white/10">
            {initials(tool.name)}
          </div>
          <div className="min-w-0 flex-1 pr-8">
            <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
            {tool.vendor && <p className="text-sm text-white/60">by {tool.vendor}</p>}
            <div className="mt-2 flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/30">
                <Icon className="h-3.5 w-3.5" /> {tool.category}
              </span>
              {tool.tags.map(t => (
                <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Field of expertise</h3>
            <p className="text-white/85 leading-relaxed">{tool.field}</p>
          </section>
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Key benefits</h3>
            <p className="text-white/85 leading-relaxed">{tool.benefits}</p>
          </section>
          {highlight && (
            <section className="rounded-2xl p-5 bg-gradient-to-br from-accent/15 to-transparent border border-accent/30">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-accent" /> Why it's a best fit for enterprise automation
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {tool.name} sits at the intersection of orchestration, intelligence, and reliability — built to plug into existing
                corporate ecosystems, scale across teams, and remove the manual friction in high-volume workflows. Trusted by
                operations, engineering, and revenue teams to compress hours of work into minutes.
              </p>
            </section>
          )}
        </div>

        <div className="mt-7 flex gap-3">
          <button
            onClick={onToggle}
            className={`flex-1 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
              inStack ? "bg-white/5 border border-white/15 text-white hover:bg-white/10" : "bg-accent text-accent-foreground hover:brightness-110 shadow-[0_10px_30px_-10px_rgba(69,204,66,0.6)]"
            }`}
          >
            {inStack ? "Remove from My Stack" : "Add to My Stack"}
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10">Close</button>
        </div>
      </div>
    </div>
  );
}

function StackPanel({ stack, tools, onRemove, onClear, onClose }: {
  stack: number[]; tools: Tool[]; onRemove: (id: number) => void; onClear: () => void; onClose: () => void;
}) {
  const selected = tools.filter(t => stack.includes(t.id));

  const exportText = () => {
    const lines = [
      "MY AUTOMATION STACK",
      "AI Discovery Channel — Powered by eSTUDY South Africa",
      "=".repeat(60),
      "",
      ...selected.map((t, i) =>
        `${i + 1}. ${t.name}${t.vendor ? ` (${t.vendor})` : ""}\n   Category: ${t.category}\n   Expertise: ${t.field}\n   Benefit: ${t.benefits}\n`
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "my-automation-stack.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <html><head><title>My Automation Stack</title>
      <style>
        body{font-family:Inter,system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 24px;color:#111}
        h1{color:#052b66;margin-bottom:4px}
        .sub{color:#45cc42;font-weight:600;margin-bottom:24px;font-size:13px;letter-spacing:.1em;text-transform:uppercase}
        .tool{border-left:3px solid #45cc42;padding:10px 16px;margin:14px 0;background:#f7fafc;border-radius:6px}
        .name{font-weight:700;color:#052b66;font-size:16px}
        .cat{display:inline-block;font-size:11px;background:#052b66;color:#fff;padding:2px 8px;border-radius:4px;margin-left:8px;text-transform:uppercase;letter-spacing:.05em}
        .label{font-size:11px;color:#45cc42;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-top:8px}
        p{margin:4px 0;font-size:14px;line-height:1.5}
        footer{margin-top:40px;padding-top:16px;border-top:1px solid #eee;color:#666;font-size:12px;text-align:center}
      </style></head><body>
        <h1>My Automation Stack</h1>
        <div class="sub">AI Discovery Channel · ${selected.length} tools curated</div>
        ${selected.map(t => `
          <div class="tool">
            <div><span class="name">${t.name}</span>${t.vendor ? ` <span style="color:#666;font-size:13px">— ${t.vendor}</span>` : ""}<span class="cat">${t.category}</span></div>
            <div class="label">Field of Expertise</div><p>${t.field}</p>
            <div class="label">Key Benefits</div><p>${t.benefits}</p>
          </div>
        `).join("")}
        <footer>Powered by eSTUDY South Africa · AI Discovery Channel</footer>
        <script>window.onload=()=>window.print()</script>
      </body></html>
    `);
    w.document.close();
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 glass-strong border-l border-white/10 flex flex-col animate-fade-in-up">
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div>
          <h3 className="font-bold text-white flex items-center gap-2"><Layers className="h-4 w-4 text-accent" /> My Automation Stack</h3>
          <p className="text-xs text-white/60 mt-0.5">{selected.length} {selected.length === 1 ? "tool" : "tools"} selected</p>
        </div>
        <button onClick={onClose} className="grid place-items-center h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-white"><X className="h-4 w-4" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {selected.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="mx-auto h-14 w-14 grid place-items-center rounded-2xl bg-white/5 border border-white/10 mb-3">
              <Plus className="h-6 w-6 text-white/40" />
            </div>
            <p className="text-sm text-white/60">No tools yet. Tap the <span className="text-accent font-semibold">+</span> on any card to start building your stack.</p>
          </div>
        )}
        {selected.map(t => (
          <div key={t.id} className="glass rounded-xl p-3 flex items-center gap-3">
            <div className="grid place-items-center h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-[#052b66] to-[#1a4ba0] text-white font-bold text-xs border border-white/10">
              {initials(t.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{t.name}</p>
              <p className="text-[11px] text-accent truncate">{t.category}</p>
            </div>
            <button onClick={() => onRemove(t.id)} className="grid place-items-center h-7 w-7 rounded-lg bg-white/5 hover:bg-destructive/30 text-white/70 hover:text-white"><X className="h-3.5 w-3.5" /></button>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={exportText} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm hover:bg-white/10">
              <Download className="h-4 w-4" /> .txt
            </button>
            <button onClick={exportPDF} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:brightness-110 shadow-[0_10px_25px_-10px_rgba(69,204,66,0.6)]">
              <Download className="h-4 w-4" /> PDF
            </button>
          </div>
          <button onClick={onClear} className="w-full text-xs text-white/50 hover:text-white py-1">Clear stack</button>
        </div>
      )}
    </aside>
  );
}

export function AIDiscoveryApp() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<Category | null>(null);
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [stack, setStack] = useState<number[]>([]);
  const [openTool, setOpenTool] = useState<Tool | null>(null);
  const [stackOpen, setStackOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter(t => {
      if (activeCat && t.category !== activeCat) return false;
      if (activeTags.length && !activeTags.every(tag => t.tags.includes(tag))) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.vendor?.toLowerCase().includes(q) ||
        t.field.toLowerCase().includes(q) ||
        t.benefits.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCat, activeTags]);

  const counts = useMemo(() => {
    const m = new Map<Category, number>();
    CATEGORIES.forEach(c => m.set(c.key, 0));
    TOOLS.forEach(t => m.set(t.category, (m.get(t.category) || 0) + 1));
    return m;
  }, []);

  const toggleStack = (id: number) =>
    setStack(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]));

  const toggleTag = (tag: Tag) =>
    setActiveTags(s => (s.includes(tag) ? s.filter(t => t !== tag) : [...s, tag]));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 glass-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid place-items-center h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-accent to-emerald-400 text-accent-foreground shadow-[0_0_20px_rgba(69,204,66,0.4)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">AI Discovery Channel</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider truncate">Powered by eSTUDY South Africa</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setFiltersOpen(v => !v)}
              className="lg:hidden grid place-items-center h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
              aria-label="Filters"
            >
              <Menu className="h-4 w-4" />
            </button>
            <button
              onClick={() => setStackOpen(true)}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all shadow-[0_8px_24px_-8px_rgba(69,204,66,0.6)]"
            >
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">My Stack</span>
              <span className="grid place-items-center h-5 min-w-5 px-1 rounded-full bg-[#052b66] text-white text-[11px] font-bold">{stack.length}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-medium text-white/80 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            CURATED AI RESEARCH HUB
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
            <span className="text-white">AI Discovery</span>{" "}
            <span className="text-gradient">Channel</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-white/70 leading-relaxed">
            eSTUDY South Africa's expert directory of 50+ enterprise-grade AI tools — engineered to help your teams
            discover, compare, and assemble the perfect automation stack.
          </p>

          {/* Search */}
          <div className="mt-9 max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 group-focus-within:text-accent transition-colors" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name, expertise, or keyword…"
                className="w-full pl-14 pr-5 py-4 rounded-2xl glass-strong text-white placeholder:text-white/40 outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgba(69,204,66,0.15)] transition-all text-base"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center h-7 w-7 rounded-full bg-white/10 text-white/70 hover:bg-white/20">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {[
              { value: "50", label: "Curated Tools" },
              { value: "6", label: "Core Functions" },
              { value: filtered.length, label: "Matching Now" },
            ].map(s => (
              <div key={s.label} className="glass rounded-2xl p-4 sm:p-5">
                <div className="text-2xl sm:text-4xl font-black text-gradient">{s.value}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-6">
          {/* Sidebar */}
          <aside className={`${filtersOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-[76px] lg:self-start`}>
            <div className="glass-strong rounded-2xl p-4 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/80 flex items-center gap-2">
                    <Filter className="h-3.5 w-3.5 text-accent" /> Categories
                  </h3>
                  {activeCat && (
                    <button onClick={() => setActiveCat(null)} className="text-[11px] text-accent hover:underline">Clear</button>
                  )}
                </div>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setActiveCat(null)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      !activeCat ? "bg-white/10 border border-white/20 text-white" : "border border-transparent hover:bg-white/5 text-white/75"
                    }`}
                  >
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-white/5"><Sparkles className="h-4 w-4" /></span>
                    <span className="flex-1 text-sm font-medium">All Tools</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">{TOOLS.length}</span>
                  </button>
                  {CATEGORIES.map(c => (
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

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/80">Capabilities</h3>
                  {activeTags.length > 0 && (
                    <button onClick={() => setActiveTags([])} className="text-[11px] text-accent hover:underline">Clear</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TAGS.map(t => (
                    <TagPill key={t} tag={t} active={activeTags.includes(t)} onClick={() => toggleTag(t)} />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-white/60">
                Showing <span className="text-white font-semibold">{filtered.length}</span> of {TOOLS.length} tools
                {activeCat && <span className="ml-2 text-accent">· {activeCat}</span>}
              </p>
            </div>
            {filtered.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <p className="text-white/70">No tools match your filters.</p>
                <button onClick={() => { setQuery(""); setActiveCat(null); setActiveTags([]); }} className="mt-3 text-sm text-accent hover:underline">Reset filters</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(t => (
                  <ToolCard
                    key={t.id}
                    tool={t}
                    inStack={stack.includes(t.id)}
                    onAdd={() => toggleStack(t.id)}
                    onOpen={() => setOpenTool(t)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid sm:grid-cols-[minmax(0,1fr)_auto] gap-4 items-center">
          <div>
            <p className="text-sm font-bold text-white">AI Discovery Channel</p>
            <p className="text-xs text-white/55 mt-1">A curated enterprise AI directory · Powered by <span className="text-accent font-semibold">eSTUDY South Africa</span></p>
          </div>
          <p className="text-[11px] text-white/40 uppercase tracking-wider">© {new Date().getFullYear()} eSTUDY · All rights reserved</p>
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
          <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" onClick={() => setStackOpen(false)} />
          <StackPanel
            stack={stack}
            tools={TOOLS}
            onRemove={id => setStack(s => s.filter(x => x !== id))}
            onClear={() => setStack([])}
            onClose={() => setStackOpen(false)}
          />
        </>
      )}
    </div>
  );
}
