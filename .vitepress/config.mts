import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BrowserID",
  description: "Passive, privacy-friendly browser authentication.",
  cleanUrls: true,
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Overview", link: "/overview" },
      { text: "Industry use cases", link: "/industry-use-cases" },
      {
        text: "Getting started",
        link: "/getting-started/enhanced-auth",
      },
      { text: "Pricing", link: "/pricing" },
      { text: "Contact", link: "mailto:sales@browserid.dev" },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Overview", link: "/overview" },
          { text: "Industry use cases", link: "/industry-use-cases" },
          { text: "Reducing costs", link: "/reducing-costs" },
          { text: "Privacy preservation", link: "/privacy-preservation" },
          {
            text: "Compliance with regulations",
            link: "/compliance-with-regulations",
          },
        ],
      },
      {
        text: "Getting started",
        items: [
          {
            text: "Enhance your authentication",
            link: "/getting-started/enhanced-auth",
          },
        ],
      },
      // {
      //   text: 'Guides',
      //   items: [
      //     { text: 'Cloudflare Pages', link: '/guides/cloudflare-page' }
      //   ]
      // },
      {
        text: "Web SDK Reference",
        items: [
          { text: "Install", link: "/web-sdk/install" },
          { text: "Generate keys", link: "/web-sdk/generate-keys" },
          { text: "Create challenge", link: "/web-sdk/create-challenge" },
          { text: "Unlink browser", link: "/web-sdk/unlink-browser" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Register", link: "/api/register" },
          { text: "Verify", link: "/api/verify" },
        ],
      },
      {
        text: "Scalability & Security",
        items: [
          {
            text: "Scalability",
            link: "/scalability-and-security/scalability",
          },
          {
            text: "Rate limiting",
            link: "/scalability-and-security/rate-limiting",
          },
          { text: "Storage", link: "/scalability-and-security/storage" },
          { text: "Longevity", link: "/scalability-and-security/longevity" },
        ],
      },
    ],
    footer: {
      message:
        '<a href="/privacy-policy">Privacy policy</a> &#8857; <a href="/terms-of-service">Terms of service</a>',
      copyright: "Copyright © 2024 - present",
    },
    socialLinks: [
      { icon: "npm", link: "https://www.npmjs.com/package/@browserid/sdk" },
    ],
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
});
