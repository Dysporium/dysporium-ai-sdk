import { createRouter, createRootRoute, createFileRoute, lazyRouteComponent, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { forwardRef, createElement, useState, useEffect } from "react";
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$3 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef"
    }
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }]
];
const Github = createLucideIcon("github", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}
const HEADER_CONFIG = {
  scrollThreshold: 20,
  logo: {
    src: "/logo.png",
    alt: "Dysporium SDK",
    height: 40
  },
  brand: {
    name: "Dysporium",
    suffix: "SDK"
  }
};
const HEADER_CLASSES = {
  base: "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
  scrolled: "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2e2e2e]",
  transparent: "bg-transparent",
  container: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between",
  nav: {
    desktop: "hidden md:flex items-center gap-8",
    mobile: "p-6 flex flex-col gap-4"
  },
  button: {
    menu: "md:hidden p-2 hover:bg-[#1f1f1f] rounded-lg transition-colors",
    close: "p-2 hover:bg-[#1f1f1f] rounded-lg transition-colors"
  },
  overlay: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden",
  drawer: {
    base: "fixed top-0 right-0 h-full bg-[#0a0a0a] border-l border-[#2e2e2e] z-50 transform transition-transform duration-300 ease-out md:hidden",
    open: "translate-x-0",
    closed: "translate-x-full"
  }
};
function useScrollEffect() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > HEADER_CONFIG.scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return isScrolled;
}
function Logo({ className }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: "/",
      className: cn("flex items-center gap-3 group", className),
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: HEADER_CONFIG.logo.src,
            alt: HEADER_CONFIG.logo.alt,
            className: "h-10 w-auto",
            height: HEADER_CONFIG.logo.height
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold tracking-tight", children: [
          HEADER_CONFIG.brand.name,
          /* @__PURE__ */ jsx("span", { className: "text-[#ff6b00]", children: HEADER_CONFIG.brand.suffix })
        ] })
      ]
    }
  );
}
const NAV_ITEMS = [
  {
    id: "features",
    label: "Features",
    href: "#features",
    type: "link"
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Dysporium/dysporium-ai-sdk",
    type: "external",
    icon: Github,
    external: true
  },
  {
    id: "get-started",
    label: "Get Started",
    href: "#",
    type: "action",
    icon: ExternalLink,
    variant: "primary"
  }
];
const MOBILE_NAV_ITEMS = [
  {
    id: "features",
    label: "Features",
    href: "#features",
    type: "link"
  },
  {
    id: "code",
    label: "Code",
    href: "#code",
    type: "link"
  }
];
function NavLink({ item, onClick, className, variant = "desktop" }) {
  const baseClasses = variant === "desktop" ? "text-[#9a9a9a] hover:text-white transition-colors text-sm font-medium uppercase tracking-wider" : "text-[#9a9a9a] hover:text-white transition-colors text-lg font-medium py-2";
  const primaryClasses = "btn-primary inline-flex items-center gap-2";
  if (item.variant === "primary") {
    return /* @__PURE__ */ jsxs(
      "a",
      {
        href: item.href,
        onClick,
        className: cn(primaryClasses, className),
        "aria-label": item.label,
        children: [
          item.label,
          item.icon && /* @__PURE__ */ jsx(item.icon, { size: 14 })
        ]
      }
    );
  }
  if (item.type === "external") {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href: item.href,
        target: item.external ? "_blank" : void 0,
        rel: item.external ? "noopener noreferrer" : void 0,
        onClick,
        className: cn(baseClasses, className),
        "aria-label": item.label,
        children: item.icon ? /* @__PURE__ */ jsx(item.icon, { size: 20 }) : item.label
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: item.href,
      onClick,
      className: cn(baseClasses, className),
      "aria-label": item.label,
      children: item.label
    }
  );
}
function DesktopNav() {
  return /* @__PURE__ */ jsx("nav", { className: HEADER_CLASSES.nav.desktop, children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsx(NavLink, { item, variant: "desktop" }, item.id)) });
}
function MobileMenuButton({ onClick }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      className: HEADER_CLASSES.button.menu,
      "aria-label": "Open menu",
      "aria-expanded": "false",
      children: /* @__PURE__ */ jsx(Menu, { size: 24 })
    }
  );
}
function MobileNav({ isOpen, onClose }) {
  const actionItems = NAV_ITEMS.filter((item) => item.type === "external" || item.variant === "primary");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          HEADER_CLASSES.overlay,
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        ),
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: cn(
          HEADER_CLASSES.drawer.base,
          isOpen ? HEADER_CLASSES.drawer.open : HEADER_CLASSES.drawer.closed
        ),
        "aria-label": "Mobile navigation",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-[#2e2e2e]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: "Menu" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: HEADER_CLASSES.button.close,
                "aria-label": "Close menu",
                children: /* @__PURE__ */ jsx(X, { size: 24 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: HEADER_CLASSES.nav.mobile, children: [
            MOBILE_NAV_ITEMS.map((item) => /* @__PURE__ */ jsx(
              NavLink,
              {
                item,
                onClick: onClose,
                variant: "mobile"
              },
              item.id
            )),
            /* @__PURE__ */ jsx("hr", { className: "border-[#2e2e2e] my-4" }),
            actionItems.map((item) => /* @__PURE__ */ jsx(
              NavLink,
              {
                item,
                onClick: onClose,
                variant: "mobile"
              },
              item.id
            ))
          ] })
        ]
      }
    )
  ] });
}
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollEffect();
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: cn(
          HEADER_CLASSES.base,
          isScrolled ? HEADER_CLASSES.scrolled : HEADER_CLASSES.transparent
        ),
        children: /* @__PURE__ */ jsxs("div", { className: HEADER_CLASSES.container, children: [
          /* @__PURE__ */ jsx(Logo, {}),
          /* @__PURE__ */ jsx(DesktopNav, {}),
          /* @__PURE__ */ jsx(MobileMenuButton, { onClick: handleMobileMenuToggle })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(MobileNav, { isOpen: isMobileMenuOpen, onClose: handleMobileMenuClose })
  ] });
}
const appCss = "/assets/styles--nAhaNUp.css";
const Route$1 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Dysporium SDK - Build AI Applications at Scale"
      },
      {
        name: "description",
        content: "The modern TypeScript SDK for building production-ready AI applications. Type-safe, streaming-first, and built for the future."
      },
      {
        name: "theme-color",
        content: "#0a0a0a"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-[#0a0a0a] text-[#fafafa]", children: [
      /* @__PURE__ */ jsx(Header, {}),
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter = () => import("./index-D5yoYNLP.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
const routerBmTF8u_g = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  c: cn,
  r: router
});
export {
  ExternalLink as E,
  cn as a,
  createLucideIcon as c,
  routerBmTF8u_g as r
};
