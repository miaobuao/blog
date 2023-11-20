import { getThemeConfig, defineConfig } from "@sugarat/theme/node";
import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream } from "sitemap";
import { PageData } from "vitepress";

const links: { url: string; lastmod: PageData["lastUpdated"] }[] = [];

const blogTheme = getThemeConfig({
  // 文章默认作者
  author: "喵不嗷",
  // 友链
  friend: [
    {
      nickname: "喵不嗷",
      des: "TO BE A GEEK :)",
      avatar: "https://avatars.githubusercontent.com/miaobuao",
      url: "/about",
    },
    // {
    //   nickname: "IDIM",
    //   des: "次元澡堂",
    //   avatar: "https://idim.cc/favicon.svg",
    //   url: "https://idim.cc",
    // },
  ],
  comment: {
    repo: "miaobuao/miaobuao.github.io",
    repoId: "R_kgDOJONNeg",
    category: "Ideas",
    categoryId: "DIC_kwDOJONNes4CVJhx",
    mapping: "title",
    // lang: 'zh-CN',
    loading: "lazy",
    inputPosition: "top",
  },
  // 开启离线的全文搜索支持（如构建报错可注释下面的配置再次尝试）
  search: "pagefind",
});

export default defineConfig({
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(require("markdown-it-mathjax3")).use(
        require("markdown-it-footnote")
      );
    },
  },
  ignoreDeadLinks: true,
  extends: blogTheme,
  lang: "zh-cmn-Hans",
  title: "Meo's Blog",
  description: "喵不嗷的博客, miaobuao blog",
  vite: {
    optimizeDeps: {
      include: ["element-plus"],
      exclude: ["@sugarat/theme"],
    },
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: "上次更新于",
    footer: {
      // message: '@miaobuao',9
      copyright:
        '欢迎关注 | <a target="_blank" href="https://github.com/miaobuao"> @miaobuao </a>',
    },
    logo: "https://avatars.githubusercontent.com/miaobuao",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/miaobuao",
      },
    ],
  },
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },
  buildEnd: async ({ outDir }) => {
    // hostname 为线上域名
    const sitemap = new SitemapStream({
      hostname: "https://miaobuao.github.io/",
    });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on("finish", r));
  },
});
