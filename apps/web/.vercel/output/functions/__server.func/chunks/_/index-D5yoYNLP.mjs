import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { c as createLucideIcon, a as cn, E as ExternalLink } from "./router-BmTF8u_g.mjs";
import { useState } from "react";
import "@tanstack/react-router";
const __iconNode$9 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$9);
const __iconNode$8 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$8);
const __iconNode$7 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$7);
const __iconNode$6 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$6);
const __iconNode$5 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
];
const Terminal = createLucideIcon("terminal", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }],
  ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }],
  ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]
];
const Workflow = createLucideIcon("workflow", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const HERO_CONSTANTS = {
  grid: {
    patternSize: 100,
    strokeColor: "#ff6b00",
    strokeWidth: 0.5
  }
};
const HERO_CLASSES = {
  section: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20",
  content: "relative z-10 max-w-6xl mx-auto px-6 text-center",
  badge: "inline-flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] border border-[#2e2e2e] rounded-full mb-8 animate-slide-up opacity-0",
  badgeDot: "w-2 h-2 bg-[#ff6b00] rounded-full animate-pulse",
  badgeText: "text-sm text-[#9a9a9a] font-medium",
  heading: "text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-slide-up opacity-0",
  description: "text-xl md:text-2xl text-[#9a9a9a] max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up opacity-0",
  ctaContainer: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up opacity-0"
};
function BackgroundGrid() {
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "absolute inset-0 w-full h-full opacity-5",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx(
          "pattern",
          {
            id: "hero-grid",
            width: HERO_CONSTANTS.grid.patternSize,
            height: HERO_CONSTANTS.grid.patternSize,
            patternUnits: "userSpaceOnUse",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: `M ${HERO_CONSTANTS.grid.patternSize} 0 L 0 0 0 ${HERO_CONSTANTS.grid.patternSize}`,
                fill: "none",
                stroke: HERO_CONSTANTS.grid.strokeColor,
                strokeWidth: HERO_CONSTANTS.grid.strokeWidth
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: "url(#hero-grid)" })
      ]
    }
  ) });
}
const HERO_CONTENT = {
  badge: {
    text: "v0.1.0 Released"
  },
  heading: {
    line1: "Build AI at",
    line2: "Production Scale"
  },
  description: "The modern TypeScript SDK for building AI applications. Type-safe, streaming-first, with OpenAI, Anthropic, and Qwen support out of the box.",
  installCommands: {
    npm: "npm install @dysporium-sdk/openai",
    pnpm: "pnpm add @dysporium-sdk/openai",
    yarn: "yarn add @dysporium-sdk/openai"
  },
  installCommand: "npm install @dysporium-sdk/openai",
  // Default for backward compatibility
  ctaButtons: [
    {
      id: "start-building",
      label: "Start Building",
      href: "#code",
      variant: "primary",
      icon: "ArrowRight"
    },
    {
      id: "view-npm",
      label: "View on npm",
      href: "https://www.npmjs.com/package/@dysporium-sdk/core",
      variant: "secondary",
      icon: "ExternalLink"
    }
  ]
};
function StatusBadge() {
  return /* @__PURE__ */ jsxs("div", { className: cn(HERO_CLASSES.badge, "delay-100"), children: [
    /* @__PURE__ */ jsx("span", { className: HERO_CLASSES.badgeDot }),
    /* @__PURE__ */ jsx("span", { className: HERO_CLASSES.badgeText, children: HERO_CONTENT.badge.text })
  ] });
}
function HeroHeading() {
  return /* @__PURE__ */ jsxs("h1", { className: cn(HERO_CLASSES.heading, "delay-100"), children: [
    HERO_CONTENT.heading.line1,
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("span", { className: "text-gradient-orange", children: HERO_CONTENT.heading.line2 })
  ] });
}
function HeroDescription() {
  return /* @__PURE__ */ jsx("p", { className: cn(HERO_CLASSES.description, "delay-200"), children: HERO_CONTENT.description });
}
const iconMap = {
  ArrowRight,
  Terminal,
  ExternalLink
};
function CTAButtons() {
  return /* @__PURE__ */ jsx("div", { className: cn(HERO_CLASSES.ctaContainer, "delay-300"), children: HERO_CONTENT.ctaButtons.map((button) => {
    const IconComponent = button.icon ? iconMap[button.icon] : null;
    const isExternal = button.href.startsWith("http");
    return /* @__PURE__ */ jsxs(
      "a",
      {
        href: button.href,
        className: `btn-${button.variant} inline-flex items-center gap-2`,
        ...isExternal && {
          target: "_blank",
          rel: "noopener noreferrer"
        },
        children: [
          button.label,
          IconComponent && /* @__PURE__ */ jsx(IconComponent, { size: 16 })
        ]
      },
      button.id
    );
  }) });
}
const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn"];
function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const [packageManager, setPackageManager] = useState("npm");
  const installCommands = HERO_CONTENT.installCommands || {
    npm: HERO_CONTENT.installCommand,
    pnpm: "pnpm add @dysporium-sdk/openai",
    yarn: "yarn add @dysporium-sdk/openai"
  };
  const command = installCommands[packageManager] || HERO_CONTENT.installCommand;
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const selectPackageManager = (pm) => {
    setPackageManager(pm);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "inline-flex items-center gap-2 px-6 py-4 bg-[#141414] border border-[#2e2e2e] rounded-lg animate-slide-up opacity-0",
        "delay-400"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: PACKAGE_MANAGERS.map((pm) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => selectPackageManager(pm),
            className: cn(
              "px-2 py-1 text-xs font-medium rounded transition-colors",
              packageManager === pm ? "bg-[#ff6b00] text-white" : "bg-[#2e2e2e] text-[#9a9a9a] hover:text-white"
            ),
            "aria-label": `Select ${pm}`,
            children: pm
          },
          pm
        )) }),
        /* @__PURE__ */ jsx("code", { className: "text-[#ff6b00] font-mono text-sm md:text-base", children: command }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCopy,
            className: "text-[#9a9a9a] hover:text-white transition-colors",
            "aria-label": "Copy command",
            children: copied ? /* @__PURE__ */ jsx(Check, { size: 18 }) : /* @__PURE__ */ jsx(Copy, { size: 18 })
          }
        )
      ]
    }
  );
}
function HeroSection() {
  return /* @__PURE__ */ jsxs("section", { className: HERO_CLASSES.section, children: [
    /* @__PURE__ */ jsx(BackgroundGrid, {}),
    /* @__PURE__ */ jsxs("div", { className: HERO_CLASSES.content, children: [
      /* @__PURE__ */ jsx(StatusBadge, {}),
      /* @__PURE__ */ jsx(HeroHeading, {}),
      /* @__PURE__ */ jsx(HeroDescription, {}),
      /* @__PURE__ */ jsx(CTAButtons, {}),
      /* @__PURE__ */ jsx(InstallCommand, {})
    ] })
  ] });
}
const FEATURES_CLASSES = {
  section: "py-32 px-6",
  container: "max-w-7xl mx-auto",
  header: {
    container: "text-center mb-20",
    label: "text-[#ff6b00] text-sm font-semibold uppercase tracking-wider mb-4 block",
    heading: "text-4xl md:text-5xl font-bold mb-6",
    description: "text-xl text-[#9a9a9a] max-w-2xl mx-auto"
  },
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  card: {
    base: "group p-8 bg-[#141414] border border-[#2e2e2e] rounded-xl hover:border-[#ff6b00]/50 transition-all duration-300 hover:-translate-y-1",
    icon: {
      container: "w-12 h-12 bg-[#1f1f1f] border border-[#2e2e2e] rounded-lg flex items-center justify-center text-[#ff6b00] mb-6 group-hover:bg-[#ff6b00] group-hover:text-[#0a0a0a] transition-colors",
      size: "w-6 h-6"
    },
    title: "text-xl font-semibold mb-3",
    description: "text-[#9a9a9a] leading-relaxed"
  }
};
const FEATURES_CONTENT = {
  section: {
    label: "Features",
    heading: {
      line1: "Everything you need to",
      line2: "build with AI"
    },
    description: "A complete toolkit for modern AI development. From simple completions to complex agentic workflows."
  },
  features: [
    {
      id: "streaming",
      icon: Zap,
      title: "Streaming First",
      description: "Built-in support for streaming responses with chunk callbacks. Perfect for chatbots and real-time AI."
    },
    {
      id: "type-safe",
      icon: Shield,
      title: "Type Safe",
      description: "End-to-end TypeScript support with full inference. Catch errors at compile time, not runtime."
    },
    {
      id: "provider-agnostic",
      icon: Layers,
      title: "Provider Architecture",
      description: "Modular provider system with OpenAI, Anthropic, and Qwen support. Add new providers without changing your code."
    },
    {
      id: "embeddings",
      icon: Database,
      title: "Embeddings & Search",
      description: "Generate embeddings, compute similarity, and build semantic search with built-in utilities."
    },
    {
      id: "tool-calling",
      icon: Workflow,
      title: "Tool Calling",
      description: "First-class support for function calling with automatic tool execution loops."
    },
    {
      id: "structured-output",
      icon: Cpu,
      title: "Structured Output",
      description: "JSON mode and JSON Schema support for reliable, structured responses from LLMs."
    }
  ]
};
function SectionHeader$1() {
  return /* @__PURE__ */ jsxs("div", { className: FEATURES_CLASSES.header.container, children: [
    /* @__PURE__ */ jsx("span", { className: FEATURES_CLASSES.header.label, children: FEATURES_CONTENT.section.label }),
    /* @__PURE__ */ jsxs("h2", { className: FEATURES_CLASSES.header.heading, children: [
      FEATURES_CONTENT.section.heading.line1,
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-gradient-orange", children: FEATURES_CONTENT.section.heading.line2 })
    ] }),
    /* @__PURE__ */ jsx("p", { className: FEATURES_CLASSES.header.description, children: FEATURES_CONTENT.section.description })
  ] });
}
function FeatureCard({ feature }) {
  const IconComponent = feature.icon;
  return /* @__PURE__ */ jsxs("div", { className: FEATURES_CLASSES.card.base, children: [
    /* @__PURE__ */ jsx("div", { className: FEATURES_CLASSES.card.icon.container, children: /* @__PURE__ */ jsx(IconComponent, { className: FEATURES_CLASSES.card.icon.size }) }),
    /* @__PURE__ */ jsx("h3", { className: FEATURES_CLASSES.card.title, children: feature.title }),
    /* @__PURE__ */ jsx("p", { className: FEATURES_CLASSES.card.description, children: feature.description })
  ] });
}
function FeaturesGrid() {
  return /* @__PURE__ */ jsx("div", { className: FEATURES_CLASSES.grid, children: FEATURES_CONTENT.features.map((feature) => /* @__PURE__ */ jsx(FeatureCard, { feature }, feature.id)) });
}
function FeaturesSection() {
  return /* @__PURE__ */ jsx("section", { id: "features", className: FEATURES_CLASSES.section, children: /* @__PURE__ */ jsxs("div", { className: FEATURES_CLASSES.container, children: [
    /* @__PURE__ */ jsx(SectionHeader$1, {}),
    /* @__PURE__ */ jsx(FeaturesGrid, {})
  ] }) });
}
const CODE_CLASSES = {
  section: "py-32 px-6 bg-[#0d0d0d]",
  container: "max-w-7xl mx-auto",
  grid: "grid lg:grid-cols-2 gap-16 items-center",
  content: {
    label: "text-[#ff6b00] text-sm font-semibold uppercase tracking-wider mb-4 block",
    heading: "text-4xl md:text-5xl font-bold mb-6",
    description: "text-xl text-[#9a9a9a] mb-8 leading-relaxed",
    featureList: "space-y-4",
    featureItem: "flex items-center gap-3",
    featureIcon: "w-5 h-5 bg-[#ff6b00] rounded flex items-center justify-center",
    featureText: "text-[#b3b3b3]"
  },
  codeBlock: {
    container: "relative",
    glow: "absolute -inset-4 bg-gradient-to-r from-[#ff6b00]/20 to-transparent blur-xl opacity-50",
    wrapper: "relative bg-[#141414] border border-[#2e2e2e] rounded-xl overflow-hidden",
    header: "flex items-center px-4 py-3 border-b border-[#2e2e2e]",
    filename: "text-xs text-[#9a9a9a] font-mono",
    pre: "p-6 overflow-x-auto",
    code: "text-sm font-mono leading-relaxed",
    line: "flex",
    lineNumber: "w-8 text-[#404040] select-none text-right mr-4"
  }
};
const CODE_CONTENT = {
  section: {
    label: "AI Providers",
    heading: {
      line1: "Powered by",
      line2: "OpenAI, Anthropic & Qwen"
    },
    description: "Full support for OpenAI's latest models (GPT-5.1, GPT-4o), Anthropic's Claude models (Claude 4.5, Claude 4), and Alibaba's Qwen models (Qwen 3, Qwen 2.5).",
    features: [
      {
        id: "openai",
        text: "OpenAI: GPT-5.1, GPT-4o, Codex"
      },
      {
        id: "anthropic",
        text: "Anthropic: Claude 4.5, Claude 4"
      },
      {
        id: "qwen",
        text: "Qwen: Qwen 3, Qwen 2.5 Series"
      },
      {
        id: "embeddings",
        text: "OpenAI Embeddings"
      }
    ]
  },
  examples: [
    {
      id: "streaming",
      label: "Streaming",
      filename: "Chat.tsx",
      content: `import { useState } from 'react'
import { createOpenAI, streamText } from '@dysporium-sdk/openai'
// or
// import { createAnthropic, streamText } from '@dysporium-sdk/anthropic'
// or
// import { createQwen, streamText } from '@dysporium-sdk/qwen'

const openai = createOpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
})

export function Chat() {
  const [response, setResponse] = useState('')

  async function ask(prompt: string) {
    setResponse('')
    await streamText({
      model: openai('gpt-4o'),
      messages: [{ role: 'user', content: prompt }],
      onChunk: (chunk) => {
        if (chunk.type === 'text-delta') {
          setResponse((prev) => prev + chunk.textDelta)
        }
      },
    })
  }

  return <button onClick={() => ask('Hello!')}>Ask AI</button>
}`
    },
    {
      id: "generate",
      label: "Generate",
      filename: "generate.ts",
      content: `import { createOpenAI, generateText } from '@dysporium-sdk/openai'
// or
// import { createAnthropic, generateText } from '@dysporium-sdk/anthropic'
// or
// import { createQwen, generateText } from '@dysporium-sdk/qwen'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const result = await generateText({
  model: openai('gpt-4o'),
  messages: [{ role: 'user', content: 'Explain quantum computing' }],
})

console.log(result.text)
console.log(result.usage) // { inputTokens, outputTokens, totalTokens }`
    },
    {
      id: "anthropic",
      label: "Anthropic",
      filename: "anthropic.ts",
      content: `import { createAnthropic, generateText } from '@dysporium-sdk/anthropic'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const result = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  messages: [{ role: 'user', content: 'Hello!' }],
})

console.log(result.text)`
    },
    {
      id: "qwen",
      label: "Qwen",
      filename: "qwen.ts",
      content: `import { createQwen, generateText } from '@dysporium-sdk/qwen'

const qwen = createQwen({
  apiKey: process.env.QWEN_API_KEY,
})

const result = await generateText({
  model: qwen('qwen2.5-72b-instruct'),
  messages: [{ role: 'user', content: 'Hello!' }],
})

console.log(result.text)`
    },
    {
      id: "embeddings",
      label: "Embeddings",
      filename: "embed.ts",
      content: `import { createOpenAI, embed, cosineSimilarity } from '@dysporium-sdk/openai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const result = await embed({
  model: openai.embedding('text-embedding-3-small'),
  value: 'Hello world',
})

console.log(result.embedding) // [0.123, -0.456, ...]
console.log(result.embedding.length) // 1536 dimensions`
    }
  ]
};
function SectionHeader() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: CODE_CLASSES.content.label, children: CODE_CONTENT.section.label }),
    /* @__PURE__ */ jsxs("h2", { className: CODE_CLASSES.content.heading, children: [
      CODE_CONTENT.section.heading.line1,
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-gradient-orange", children: CODE_CONTENT.section.heading.line2 })
    ] }),
    /* @__PURE__ */ jsx("p", { className: CODE_CLASSES.content.description, children: CODE_CONTENT.section.description })
  ] });
}
function FeatureList() {
  return /* @__PURE__ */ jsx("ul", { className: CODE_CLASSES.content.featureList, children: CODE_CONTENT.section.features.map((feature) => /* @__PURE__ */ jsxs("li", { className: CODE_CLASSES.content.featureItem, children: [
    /* @__PURE__ */ jsx("div", { className: CODE_CLASSES.content.featureIcon, children: /* @__PURE__ */ jsx(Check, { size: 12, className: "text-[#0a0a0a]" }) }),
    /* @__PURE__ */ jsx("span", { className: CODE_CLASSES.content.featureText, children: feature.text })
  ] }, feature.id)) });
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
const COLORS = {
  keyword: "#ff79c6",
  string: "#f1fa8c",
  comment: "#6272a4",
  function: "#50fa7b",
  type: "#8be9fd",
  number: "#bd93f9",
  operator: "#ff79c6",
  plain: "#f8f8f2"
};
const KEYWORDS = [
  "import",
  "export",
  "from",
  "const",
  "let",
  "var",
  "function",
  "async",
  "await",
  "return",
  "if",
  "else",
  "for",
  "while",
  "true",
  "false",
  "null",
  "undefined",
  "new",
  "class",
  "extends",
  "interface",
  "type",
  "enum",
  "default",
  "try",
  "catch"
];
function highlightLine(line) {
  if (!line.trim()) {
    return "";
  }
  if (line.trim().startsWith("//")) {
    const leadingSpaces = line.match(/^(\s*)/)?.[1] || "";
    return `${escapeHtml(leadingSpaces)}<span style="color: ${COLORS.comment}">${escapeHtml(line.trim())}</span>`;
  }
  let result = "";
  let i = 0;
  while (i < line.length) {
    if (line.slice(i, i + 2) === "//") {
      result += `<span style="color: ${COLORS.comment}">${escapeHtml(line.slice(i))}</span>`;
      break;
    }
    if (line[i] === "'" || line[i] === '"' || line[i] === "`") {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === "\\") j++;
        j++;
      }
      j++;
      result += `<span style="color: ${COLORS.string}">${escapeHtml(line.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      result += `<span style="color: ${COLORS.number}">${escapeHtml(line.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      const isFunction = line[j] === "(" || line[j] === "<" && /^[A-Z]/.test(word);
      const prevNonSpace = line.slice(0, i).trimEnd();
      const isType = prevNonSpace.endsWith(":") || prevNonSpace.endsWith("<");
      if (KEYWORDS.includes(word)) {
        result += `<span style="color: ${COLORS.keyword}">${escapeHtml(word)}</span>`;
      } else if (isFunction && /^[a-z]/.test(word)) {
        result += `<span style="color: ${COLORS.function}">${escapeHtml(word)}</span>`;
      } else if (isType || /^[A-Z]/.test(word)) {
        result += `<span style="color: ${COLORS.type}">${escapeHtml(word)}</span>`;
      } else {
        result += `<span style="color: ${COLORS.plain}">${escapeHtml(word)}</span>`;
      }
      i = j;
      continue;
    }
    if (/[+\-*/%=<>!&|?:]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[+\-*/%=<>!&|?:]/.test(line[j])) j++;
      result += `<span style="color: ${COLORS.operator}">${escapeHtml(line.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    result += escapeHtml(line[i]);
    i++;
  }
  return result;
}
function CodeBlock() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const currentExample = CODE_CONTENT.examples[activeTab];
  const lines = currentExample.content.split("\n");
  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentExample.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: CODE_CLASSES.codeBlock.container, children: [
    /* @__PURE__ */ jsx("div", { className: CODE_CLASSES.codeBlock.glow }),
    /* @__PURE__ */ jsxs("div", { className: CODE_CLASSES.codeBlock.wrapper, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-[#2e2e2e]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex", children: CODE_CONTENT.examples.map((example, index) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveTab(index),
            className: `px-4 py-3 text-sm font-medium transition-colors ${activeTab === index ? "text-[#ff6b00] border-b-2 border-[#ff6b00] -mb-px" : "text-[#9a9a9a] hover:text-white"}`,
            children: example.label
          },
          example.id
        )) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCopy,
            className: "flex items-center gap-2 px-3 py-2 mr-2 text-xs text-[#9a9a9a] hover:text-white transition-colors",
            title: "Copy code",
            children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Check, { size: 14, className: "text-green-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-green-500", children: "Copied!" })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Copy, { size: 14 }),
              /* @__PURE__ */ jsx("span", { children: "Copy" })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: CODE_CLASSES.codeBlock.header, children: /* @__PURE__ */ jsx("span", { className: CODE_CLASSES.codeBlock.filename, children: currentExample.filename }) }),
      /* @__PURE__ */ jsx("pre", { className: CODE_CLASSES.codeBlock.pre, children: /* @__PURE__ */ jsx("code", { className: CODE_CLASSES.codeBlock.code, children: lines.map((line, i) => /* @__PURE__ */ jsxs("div", { className: CODE_CLASSES.codeBlock.line, children: [
        /* @__PURE__ */ jsx("span", { className: CODE_CLASSES.codeBlock.lineNumber, children: i + 1 }),
        /* @__PURE__ */ jsx(
          "span",
          {
            dangerouslySetInnerHTML: { __html: highlightLine(line) || "&nbsp;" }
          }
        )
      ] }, i)) }) })
    ] })
  ] });
}
function CodeSection() {
  return /* @__PURE__ */ jsx("section", { id: "code", className: CODE_CLASSES.section, children: /* @__PURE__ */ jsx("div", { className: CODE_CLASSES.container, children: /* @__PURE__ */ jsxs("div", { className: CODE_CLASSES.grid, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(SectionHeader, {}),
      /* @__PURE__ */ jsx(FeatureList, {})
    ] }),
    /* @__PURE__ */ jsx(CodeBlock, {})
  ] }) }) });
}
const FOOTER_CLASSES = {
  footer: "py-16 px-6 border-t border-[#2e2e2e]",
  container: "max-w-7xl mx-auto",
  grid: "grid md:grid-cols-4 gap-12 mb-12",
  brand: {
    container: "md:col-span-1",
    logoContainer: "flex items-center gap-3 mb-4",
    logo: "h-10 w-auto",
    name: "text-xl font-bold tracking-tight",
    suffix: "text-[#ff6b00]",
    tagline: "text-[#9a9a9a] text-sm"
  },
  linkGroup: {
    title: "font-semibold mb-4 text-sm uppercase tracking-wider",
    list: "space-y-3 text-[#9a9a9a]",
    link: "hover:text-white transition-colors"
  },
  bottom: {
    container: "pt-8 border-t border-[#2e2e2e] flex flex-col md:flex-row items-center justify-between gap-4",
    copyright: "text-[#9a9a9a] text-sm"
  }
};
const FOOTER_CONTENT = {
  brand: {
    logo: {
      src: "/logo.png",
      alt: "Dysporium SDK",
      height: 40
    },
    name: "Dysporium",
    suffix: "SDK",
    tagline: "Build AI applications at production scale."
  },
  linkGroups: [
    {
      id: "packages",
      title: "Packages",
      links: [
        {
          id: "core",
          label: "@dysporium-sdk/core",
          href: "https://www.npmjs.com/package/@dysporium-sdk/core",
          external: true
        },
        {
          id: "openai",
          label: "@dysporium-sdk/openai",
          href: "https://www.npmjs.com/package/@dysporium-sdk/openai",
          external: true
        },
        {
          id: "anthropic",
          label: "@dysporium-sdk/anthropic",
          href: "https://www.npmjs.com/package/@dysporium-sdk/anthropic",
          external: true
        },
        {
          id: "qwen",
          label: "@dysporium-sdk/qwen",
          href: "https://www.npmjs.com/package/@dysporium-sdk/qwen",
          external: true
        },
        {
          id: "provider",
          label: "@dysporium-sdk/provider",
          href: "https://www.npmjs.com/package/@dysporium-sdk/provider",
          external: true
        }
      ]
    },
    {
      id: "resources",
      title: "Resources",
      links: [
        {
          id: "features",
          label: "Features",
          href: "#features"
        },
        {
          id: "documentation",
          label: "Documentation",
          href: "https://dysporium.mintlify.app/getting-started",
          external: true
        },
        {
          id: "examples",
          label: "Examples",
          href: "https://dysporium.mintlify.app/examples/basic-usage",
          external: true
        },
        {
          id: "github",
          label: "GitHub",
          href: "https://github.com/dysporium/dysporium-sdk",
          external: true
        }
      ]
    }
  ],
  copyright: {
    year: 2025,
    company: "Dysporium",
    text: "All rights reserved."
  }
};
function BrandSection() {
  return /* @__PURE__ */ jsxs("div", { className: FOOTER_CLASSES.brand.container, children: [
    /* @__PURE__ */ jsxs("div", { className: FOOTER_CLASSES.brand.logoContainer, children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: FOOTER_CONTENT.brand.logo.src,
          alt: FOOTER_CONTENT.brand.logo.alt,
          className: FOOTER_CLASSES.brand.logo,
          height: FOOTER_CONTENT.brand.logo.height
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: FOOTER_CLASSES.brand.name, children: [
        FOOTER_CONTENT.brand.name,
        /* @__PURE__ */ jsx("span", { className: FOOTER_CLASSES.brand.suffix, children: FOOTER_CONTENT.brand.suffix })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: FOOTER_CLASSES.brand.tagline, children: FOOTER_CONTENT.brand.tagline })
  ] });
}
function LinkGroup({ group }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h4", { className: FOOTER_CLASSES.linkGroup.title, children: group.title }),
    /* @__PURE__ */ jsx("ul", { className: FOOTER_CLASSES.linkGroup.list, children: group.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "a",
      {
        href: link.href,
        className: FOOTER_CLASSES.linkGroup.link,
        ...link.external && {
          target: "_blank",
          rel: "noopener noreferrer"
        },
        children: link.label
      }
    ) }, link.id)) })
  ] });
}
function FooterBottom() {
  return /* @__PURE__ */ jsx("div", { className: FOOTER_CLASSES.bottom.container, children: /* @__PURE__ */ jsxs("p", { className: FOOTER_CLASSES.bottom.copyright, children: [
    "© ",
    FOOTER_CONTENT.copyright.year,
    " ",
    FOOTER_CONTENT.copyright.company,
    ".",
    " ",
    FOOTER_CONTENT.copyright.text
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: FOOTER_CLASSES.footer, children: /* @__PURE__ */ jsxs("div", { className: FOOTER_CLASSES.container, children: [
    /* @__PURE__ */ jsxs("div", { className: FOOTER_CLASSES.grid, children: [
      /* @__PURE__ */ jsx(BrandSection, {}),
      FOOTER_CONTENT.linkGroups.map((group) => /* @__PURE__ */ jsx(LinkGroup, { group }, group.id))
    ] }),
    /* @__PURE__ */ jsx(FooterBottom, {})
  ] }) });
}
function App() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0a0a0a] bg-grid-pattern bg-noise", children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(FeaturesSection, {}),
    /* @__PURE__ */ jsx(CodeSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  App as component
};
