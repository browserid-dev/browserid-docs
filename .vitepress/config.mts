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
      { text: "Use cases", link: "/use-cases" },
      {
        text: "Getting started",
        link: "/getting-started/setup-browserid",
      },
      { text: "Pricing", link: "/pricing" },
      { text: "Waitlist", link: "https://accounts.browserid.dev/waitlist" },
      // { text: "Contact", link: "mailto:sales@browserid.dev" },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Overview", link: "/overview" },
          { text: "Use cases", link: "/use-cases" },
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
            text: "Set up BrowserID",
            link: "/getting-started/setup-browserid",
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
          {
            text: "Frontend",
            items: [
              {
                text: "Create keypair",
                link: "/sdk/frontend/create-keypair",
              },
              {
                text: "Create challenge",
                link: "/sdk/frontend/create-challenge",
              },
              { text: "Unlink browser", link: "/sdk/frontend/unlink-browser" },
            ],
          },
          {
            text: "Backend",
            items: [
              { text: "Backend Class", link: "/sdk/backend/backend-class" },
              { text: "Register", link: "/sdk/backend/register" },
              { text: "Verify", link: "/sdk/backend/verify" },
            ],
          },
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
            text: "Key rotation",
            link: "/scalability-and-security/key-rotation",
          },
          {
            text: "Rate limiting",
            link: "/scalability-and-security/rate-limiting",
          },
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
