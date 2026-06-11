export type Tool = {
  id: number;
  name: string;
  vendor?: string;
  category: Category;
  field: string;
  benefits: string;
  tags: Tag[];
  domain?: string;
  departments: Department[];
};

export type Category =
  | "LLMs & Text"
  | "Coding & Dev"
  | "Search & Research"
  | "Visual & Image"
  | "Video, Audio & Avatar"
  | "Productivity & Automation";

export type Tag = "Enterprise-Ready" | "Free-Tier" | "Open Source" | "Automation Force Multiplier";

export type Department =
  | "Finance & Procurement"
  | "Human Resources"
  | "Mentoring & Education"
  | "Learning Content & Design"
  | "Information Technology";

export const CATEGORIES: { key: Category; label: string; short: string }[] = [
  { key: "LLMs & Text", label: "Large Language Models & Text Generation", short: "LLMs & Text" },
  { key: "Coding & Dev", label: "Software Development & Coding Agents", short: "Coding & Dev" },
  { key: "Search & Research", label: "Search, Research & Information Retrieval", short: "Search & Research" },
  { key: "Visual & Image", label: "Visual Art, Design & Image Generation", short: "Visual & Image" },
  { key: "Video, Audio & Avatar", label: "Video, Audio & Avatar Production", short: "Video, Audio & Avatar" },
  { key: "Productivity & Automation", label: "Productivity, Automation & Workflow Orchestration", short: "Productivity & Automation" },
];

export const TAGS: Tag[] = ["Enterprise-Ready", "Free-Tier", "Open Source", "Automation Force Multiplier"];

export const DEPARTMENTS: Department[] = [
  "Finance & Procurement",
  "Human Resources",
  "Mentoring & Education",
  "Learning Content & Design",
  "Information Technology",
];

// Helper: define raw tools then map to add departments by name.
type Raw = Omit<Tool, "departments">;

const RAW: Raw[] = [
  { id: 1, name: "ChatGPT", vendor: "OpenAI", category: "LLMs & Text", field: "General-purpose assistance, writing, conversational AI.", benefits: "Highly versatile; excels at brainstorming, complex text formatting, iterative reasoning.", tags: ["Enterprise-Ready", "Free-Tier"], domain: "openai.com" },
  { id: 2, name: "Claude", vendor: "Anthropic", category: "LLMs & Text", field: "Nuanced writing, complex legal/financial analysis, long documents.", benefits: "Massive context window; secure, deeply analytical, human-like prose.", tags: ["Enterprise-Ready", "Free-Tier"], domain: "anthropic.com" },
  { id: 3, name: "Gemini", vendor: "Google", category: "LLMs & Text", field: "Multimodal reasoning (text, audio, video) and ecosystem integration.", benefits: "Processes long video/audio native inputs effortlessly; integrates with Google Workspace.", tags: ["Enterprise-Ready", "Free-Tier"], domain: "gemini.google.com" },
  { id: 4, name: "Grok", vendor: "xAI", category: "LLMs & Text", field: "Real-time information processing and conversational chat.", benefits: "Accesses live, real-time data feeds via X (Twitter) for current events.", tags: ["Free-Tier"], domain: "x.ai" },
  { id: 5, name: "DeepSeek", category: "LLMs & Text", field: "Highly cost-effective text processing and basic reasoning.", benefits: "Publicly available model weights; slashes API costs for budget-conscious enterprises.", tags: ["Open Source", "Free-Tier"], domain: "deepseek.com" },
  { id: 6, name: "Meta AI (Llama)", category: "LLMs & Text", field: "Open-source, customizable foundation conversational modeling.", benefits: "Allows businesses to self-host and fine-tune models locally without cloud APIs.", tags: ["Open Source", "Enterprise-Ready"], domain: "meta.com" },
  { id: 7, name: "Jasper", category: "LLMs & Text", field: "Enterprise marketing copy and brand voice generation.", benefits: "Built-in templates for SEO, blogs, ad copy matching unique brand tone.", tags: ["Enterprise-Ready"], domain: "jasper.ai" },
  { id: 8, name: "Copy.ai", category: "LLMs & Text", field: "GTM (Go-To-Market) and sales copywriting automation.", benefits: "Streamlines marketing workflows, bulk email drafting, social media pipelines.", tags: ["Free-Tier", "Automation Force Multiplier"], domain: "copy.ai" },
  { id: 9, name: "Writer", category: "LLMs & Text", field: "Enterprise generative content for regulated industries.", benefits: "Enforces corporate compliance, editorial style guides, data privacy standards out of the box.", tags: ["Enterprise-Ready"], domain: "writer.com" },
  { id: 10, name: "Anyword", category: "LLMs & Text", field: "Performance marketing and copy optimization.", benefits: "Uses predictive performance scores to forecast conversions before publishing.", tags: ["Enterprise-Ready"], domain: "anyword.com" },

  { id: 11, name: "GitHub Copilot", category: "Coding & Dev", field: "In-line code completion and multi-file contextual refactoring.", benefits: "Speeds up development by predicting code blocks directly inside the IDE.", tags: ["Enterprise-Ready"], domain: "github.com" },
  { id: 12, name: "Cursor", category: "Coding & Dev", field: "AI-first code editing and repository-wide building.", benefits: "Chat directly with entire codebase, generating complex features autonomously.", tags: ["Enterprise-Ready", "Automation Force Multiplier"], domain: "cursor.com" },
  { id: 13, name: "v0", vendor: "Vercel", category: "Coding & Dev", field: "Frontend UI generation and rapid component prototyping.", benefits: "Generates production-ready React, Tailwind CSS, and HTML code from simple UI descriptions.", tags: ["Free-Tier"], domain: "v0.dev" },
  { id: 14, name: "Lovable", category: "Coding & Dev", field: "Full-stack web application generation for non-technical users.", benefits: "Builds operational web apps from natural language, handling front-to-back engineering logic.", tags: ["Free-Tier", "Automation Force Multiplier"], domain: "lovable.dev" },
  { id: 15, name: "Claude Code", category: "Coding & Dev", field: "Terminal-based agentic programming and deep debugging.", benefits: "Executes tasks inside developer CLI, managing local testing and repo refactoring.", tags: ["Enterprise-Ready"], domain: "anthropic.com" },
  { id: 16, name: "Anvil", category: "Coding & Dev", field: "Rapid Python full-stack web app development.", benefits: "Permits building complete, database-backed web applications entirely using Python code.", tags: ["Free-Tier"], domain: "anvil.works" },
  { id: 17, name: "Tabnine", category: "Coding & Dev", field: "Private, secure context-aware code auto-completion.", benefits: "Offers locally hostable AI models ensuring corporate codebases never leave local environments.", tags: ["Enterprise-Ready", "Open Source"], domain: "tabnine.com" },
  { id: 18, name: "Codeium", category: "Coding & Dev", field: "Free-tier, multi-IDE code acceleration.", benefits: "Provides lightning-fast suggestions/chat compatible with over 40+ popular IDEs.", tags: ["Free-Tier"], domain: "codeium.com" },
  { id: 19, name: "Replit Agent", category: "Coding & Dev", field: "Rapid deployment and cloud-based software creation.", benefits: "Builds, provisions databases, and deploys applications to live URLs automatically from prompts.", tags: ["Free-Tier", "Automation Force Multiplier"], domain: "replit.com" },
  { id: 20, name: "Amazon Q", category: "Coding & Dev", field: "AWS infrastructure optimization and developer assistance.", benefits: "Explains AWS configurations, assists with security audits, optimizes cloud resource costs.", tags: ["Enterprise-Ready", "Automation Force Multiplier"], domain: "aws.amazon.com" },

  { id: 21, name: "Perplexity AI", category: "Search & Research", field: "Conversational web search and deep research.", benefits: "Delivers direct answers compiled from live web sources with inline verification citations.", tags: ["Free-Tier", "Enterprise-Ready"], domain: "perplexity.ai" },
  { id: 22, name: "NotebookLM", vendor: "Google", category: "Search & Research", field: "Personalized, source-grounded document synthesis.", benefits: "Generates instant study guides, summaries, interactive audio briefs strictly from uploaded documents.", tags: ["Free-Tier", "Enterprise-Ready", "Automation Force Multiplier"], domain: "notebooklm.google.com" },
  { id: 23, name: "Consensus", category: "Search & Research", field: "Evidence-based scientific research search engine.", benefits: "Searches peer-reviewed papers to provide data-backed answers to health/science queries.", tags: ["Free-Tier"], domain: "consensus.app" },
  { id: 24, name: "Elicit", category: "Search & Research", field: "Literature review automation and research workflow scaling.", benefits: "Extracts data tables, findings, concepts across thousands of academic papers simultaneously.", tags: ["Free-Tier", "Automation Force Multiplier"], domain: "elicit.com" },
  { id: 25, name: "Komo", category: "Search & Research", field: "Ad-free, conceptual web exploration.", benefits: "Organizes search journeys into conversational, deep-dive modules rather than blue links.", tags: ["Free-Tier"], domain: "komo.ai" },

  { id: 26, name: "Midjourney", category: "Visual & Image", field: "Highly aesthetic and cinematic commercial image generation.", benefits: "Industry-leading artistic quality, rendering complex textures and atmospheric lighting.", tags: ["Enterprise-Ready"], domain: "midjourney.com" },
  { id: 27, name: "DALL-E 3", vendor: "OpenAI", category: "Visual & Image", field: "Strict prompt adherence and textbook-style graphic creation.", benefits: "Understands complex text instructions precisely inside the ChatGPT ecosystem.", tags: ["Enterprise-Ready"], domain: "openai.com" },
  { id: 28, name: "Stable Diffusion", category: "Visual & Image", field: "Open-source, hyper-customizable visual generation.", benefits: "Offers complete control via local installation, custom checkpoints, plugin extensions.", tags: ["Open Source", "Free-Tier"], domain: "stability.ai" },
  { id: 29, name: "Canva Magic Studio", category: "Visual & Image", field: "Graphic design asset generation for social media and presentations.", benefits: "Lowers barrier to entry for editing objects, text effects, and reshaping design elements.", tags: ["Free-Tier", "Enterprise-Ready"], domain: "canva.com" },
  { id: 30, name: "Adobe Firefly", category: "Visual & Image", field: "Commercially safe graphic generation and generative filling.", benefits: "Trained exclusively on licensed/public domain images, ensuring corporate legal safety.", tags: ["Enterprise-Ready"], domain: "adobe.com" },
  { id: 31, name: "Google Pics", category: "Visual & Image", field: "Integrated Workspace canvas editing and asset creation.", benefits: "Allows collaborative canvases and instant image generation embedded within Slides/Drive.", tags: ["Enterprise-Ready"], domain: "google.com" },

  { id: 32, name: "HeyGen", category: "Video, Audio & Avatar", field: "Synthetic AI avatars and automated video localization.", benefits: "Generates realistic, multilingual corporate videos using 15-second training clips and flawless lip-syncing.", tags: ["Enterprise-Ready", "Automation Force Multiplier"], domain: "heygen.com" },
  { id: 33, name: "Runway (Gen-3)", category: "Video, Audio & Avatar", field: "Photorealistic video generation and cinematic special effects.", benefits: "Controls camera panning, text-to-video motion dynamics, environmental physics.", tags: ["Enterprise-Ready"], domain: "runwayml.com" },
  { id: 34, name: "ElevenLabs", category: "Video, Audio & Avatar", field: "Hyper-realistic text-to-speech and voice cloning.", benefits: "Captures human emotional nuances, pacing, inflections across dozens of languages.", tags: ["Enterprise-Ready", "Free-Tier"], domain: "elevenlabs.io" },
  { id: 35, name: "Sora", vendor: "OpenAI", category: "Video, Audio & Avatar", field: "Long-horizon, physically coherent text-to-video generation.", benefits: "Creates detailed scenes with multiple characters and complex motions up to a minute long.", tags: ["Enterprise-Ready"], domain: "openai.com" },
  { id: 36, name: "Descript", category: "Video, Audio & Avatar", field: "Audio/video editing via script-based text manipulation.", benefits: "Edit video simply by deleting words from transcribed text; includes voice correction.", tags: ["Free-Tier", "Automation Force Multiplier"], domain: "descript.com" },
  { id: 37, name: "Stability Audio", category: "Video, Audio & Avatar", field: "Longer-form, highly structured music composition.", benefits: "Generates coherent multi-minute music tracks and sound effects via open-weight options.", tags: ["Open Source"], domain: "stability.ai" },
  { id: 38, name: "Suno AI", category: "Video, Audio & Avatar", field: "Full vocal song and instrumental generation from text.", benefits: "Produces radio-ready songs complete with custom instrumentation, lyrics, and vocal harmonies.", tags: ["Free-Tier"], domain: "suno.com" },
  { id: 39, name: "Lovo.ai", category: "Video, Audio & Avatar", field: "Professional voiceovers for marketing and educational courses.", benefits: "Offers extensive library of specialized character voices engineered for long-form audiobooks.", tags: ["Free-Tier", "Enterprise-Ready"], domain: "lovo.ai" },

  { id: 40, name: "n8n", category: "Productivity & Automation", field: "Fair-code, highly technical workflow automation.", benefits: "Connects complex APIs visually; allows custom JavaScript/Python injections. Secure and self-hostable.", tags: ["Open Source", "Enterprise-Ready", "Automation Force Multiplier"], domain: "n8n.io" },
  { id: 41, name: "Zapier Agents", category: "Productivity & Automation", field: "AI-driven task orchestration and cross-app workflows.", benefits: "Connects to thousands of standard SaaS apps instantly; monitors queues to make autonomous decisions.", tags: ["Enterprise-Ready", "Automation Force Multiplier"], domain: "zapier.com" },
  { id: 42, name: "Gamma", category: "Productivity & Automation", field: "Rapid presentation, webpage, and document formatting.", benefits: "Eliminates manual slide-building by arranging text prompts into visually stunning pitch decks.", tags: ["Free-Tier"], domain: "gamma.app" },
  { id: 43, name: "Gumloop", category: "Productivity & Automation", field: "Multi-step web scraping and data pipeline automation.", benefits: "Grants ability to construct powerful background AI scrapers and data parsers visually.", tags: ["Enterprise-Ready", "Automation Force Multiplier"], domain: "gumloop.com" },
  { id: 44, name: "Otter.ai", category: "Productivity & Automation", field: "Automated meeting transcription and collaborative action summaries.", benefits: "Listens to live calls, attributes speakers, and extracts post-meeting to-do lists.", tags: ["Free-Tier", "Enterprise-Ready"], domain: "otter.ai" },
  { id: 45, name: "Beautiful.ai", category: "Productivity & Automation", field: "Dynamic presentation layout and smart slide design.", benefits: "Automatically resizes layouts and shifts iconography when you type text for consistent rules.", tags: ["Enterprise-Ready"], domain: "beautiful.ai" },
  { id: 46, name: "Botpress", category: "Productivity & Automation", field: "Multi-channel conversational chatbot development.", benefits: "Integrates deep customer support workflows across WhatsApp, Telegram, and websites.", tags: ["Open Source", "Enterprise-Ready", "Automation Force Multiplier"], domain: "botpress.com" },
  { id: 47, name: "Clearscope", category: "Productivity & Automation", field: "Content optimization and SEO market analysis.", benefits: "Deciphers search engine patterns to map keywords needed to rank on Google.", tags: ["Enterprise-Ready"], domain: "clearscope.io" },
  { id: 48, name: "Originality.ai", category: "Productivity & Automation", field: "AI content detection and plagiarism auditing.", benefits: "Empowers publishers to verify if web copy was written by humans or generated by an LLM.", tags: ["Enterprise-Ready"], domain: "originality.ai" },
  { id: 49, name: "Fireflies.ai", category: "Productivity & Automation", field: "Voice analytics and central corporate meeting repositories.", benefits: "Transcribes internal meetings while tracking overall speaker sentiment and target keywords.", tags: ["Enterprise-Ready", "Automation Force Multiplier"], domain: "fireflies.ai" },
  { id: 50, name: "Feedly Leo", category: "Productivity & Automation", field: "Enterprise market intelligence and news aggregation.", benefits: "Filters noise by teaching an AI assistant to curate daily news tied to competitors.", tags: ["Enterprise-Ready"], domain: "feedly.com" },
];

// Department assignments by tool name
const DEPT_MAP: Record<Department, string[]> = {
  "Finance & Procurement": ["DeepSeek", "Claude", "Amazon Q", "Anyword", "Clearscope", "Perplexity AI", "Otter.ai", "Fireflies.ai"],
  "Human Resources": ["Writer", "Copy.ai", "Originality.ai", "Jasper", "Otter.ai", "HeyGen", "ChatGPT", "Gemini"],
  "Mentoring & Education": ["NotebookLM", "Gamma", "Beautiful.ai", "Consensus", "Elicit", "Claude", "ChatGPT", "Perplexity AI", "ElevenLabs"],
  "Learning Content & Design": ["Midjourney", "Adobe Firefly", "Canva Magic Studio", "HeyGen", "ElevenLabs", "DALL-E 3", "Runway (Gen-3)", "Suno AI", "Lovo.ai", "Descript", "Sora", "Stable Diffusion", "Stability Audio", "Google Pics", "Gamma"],
  "Information Technology": ["GitHub Copilot", "Cursor", "v0", "Lovable", "Replit Agent", "Tabnine", "Codeium", "Claude Code", "Anvil", "n8n", "Botpress", "Amazon Q", "Gumloop", "Zapier Agents"],
};

function deptsFor(name: string): Department[] {
  return DEPARTMENTS.filter(d => DEPT_MAP[d].includes(name));
}

export const TOOLS: Tool[] = RAW.map(r => ({ ...r, departments: deptsFor(r.name) }));

export const ENTERPRISE_HIGHLIGHTS = new Set([
  "n8n", "Zapier Agents", "Gumloop", "Botpress", "Fireflies.ai", "Cursor", "Amazon Q", "Writer", "NotebookLM",
]);

export const TRENDING = ["ChatGPT", "Claude", "Cursor", "n8n", "Midjourney", "NotebookLM", "Lovable", "HeyGen"];

export function logoUrl(tool: Tool): string | null {
  if (!tool.domain) return null;
  return `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`;
}
