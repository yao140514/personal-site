/**
 * ============================================================
 * 站点内容配置（唯一需要修改的文件）
 * ------------------------------------------------------------
 * 所有个人文案、项目条目、社交链接都集中在这里。
 * 修改本文件后刷新页面即可生效，无需改动 HTML / CSS / JS。
 * ============================================================
 */
window.SITE_CONFIG = {
  // ---------- 基本信息 ----------
  name: "林一舟",                 // 姓名
  nameEn: "Lin Yizhou",           // 拼音 / 英文名（用于副标题）
  monogram: "林",                 // 首屏圆形字标（取一个字即可）
  role: "开发者 · 创作者",         // 一句话身份
  tagline: "把复杂的问题，做成简单好用的东西。",   // 首屏大标题
  intro:
    "一名专注于 Web 的开发者，喜欢设计良好、运行可靠的软件；业余时间写作、摄影，并维护几个小而美的工具。",
  location: "杭州 · 中国",
  availability: "对合作与有趣的点子保持开放",
  email: "hi@linyizhou.dev",

  // ---------- SEO ----------
  seo: {
    title: "林一舟 — 开发者 · 创作者",
    description: "林一舟的个人网站：关于我、技能、精选项目与联系方式。",
  },

  // ---------- 关于 / 技能 ----------
  about: {
    heading: "关于",
    paragraphs: [
      "过去几年里，我一直围绕 Web 构建产品：从像素级的界面细节，到支撑它们的基础设施。我相信好的工具应当安静、可靠，并且尊重使用它的人。",
      "工作之外，我持续写作技术笔记，维护几个开源小项目，也对排版、摄影与长跑保持着稳定的热情。",
    ],
    skills: [
      { group: "前端", items: ["TypeScript", "React", "CSS 工程化", "可访问性"] },
      { group: "后端", items: ["Node.js", "边缘计算 / Workers", "API 设计"] },
      { group: "工程", items: ["性能优化", "CI / CD", "技术写作"] },
    ],
  },

  // ---------- 精选项目（2–3 个，featured 的会通栏展示） ----------
  projects: [
    {
      name: "NoteFlow",
      year: "2025",
      description:
        "一款本地优先的极简 Markdown 笔记：打开即写、全文检索、纯文件存储，数据永远属于你自己。",
      tags: ["TypeScript", "本地优先", "开源"],
      links: [
        { label: "在线体验", url: "https://example.com/noteflow" },
        { label: "源代码", url: "https://github.com/yourname/noteflow" },
      ],
      featured: true,
    },
    {
      name: "Metrix",
      year: "2024",
      description:
        "个人数据看板：把阅读、运动、睡眠等分散的记录，聚合到一张安静的仪表盘上。",
      tags: ["数据可视化", "PWA"],
      links: [{ label: "源代码", url: "https://github.com/yourname/metrix" }],
    },
    {
      name: "读路 ReadingPath",
      year: "2023",
      description:
        "阅读记录与年度读书报告生成工具，用一页网页回顾一年的阅读轨迹。",
      tags: ["静态站点", "小工具"],
      links: [{ label: "在线体验", url: "https://example.com/readingpath" }],
    },
  ],

  // ---------- 社交链接（icon 可选：github / x / zhihu / link） ----------
  socials: [
    { label: "GitHub", url: "https://github.com/yourname", icon: "github" },
    { label: "知乎", url: "https://www.zhihu.com/people/yourname", icon: "zhihu" },
    { label: "X", url: "https://x.com/yourname", icon: "x" },
  ],

  // ---------- 页脚 ----------
  footer: {
    note: "手工编写 HTML 与 CSS · 无追踪、无 Cookie",
  },
};
