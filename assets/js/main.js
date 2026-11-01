/* ============================================================
   渲染与交互：全部内容来自 site.config.js
   ============================================================ */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel) { return document.querySelector(sel); }

  function text(id, value) {
    var node = $(id);
    if (node && value) node.textContent = value;
  }

  function make(tag, className, textContent) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (textContent != null) node.textContent = textContent;
    return node;
  }

  /* ---------- 图标（内联 SVG，无外部请求） ---------- */
  var ICONS = {
    github:
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    x:
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-5.431Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"/></svg>',
    zhihu: '<span class="icon-text" aria-hidden="true">知</span>',
    link:
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    arrow:
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>'
  };

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  /* ---------- SEO / 品牌 ---------- */
  if (cfg.seo) {
    if (cfg.seo.title) document.title = cfg.seo.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && cfg.seo.description) metaDesc.setAttribute("content", cfg.seo.description);
  }
  text("#brand", cfg.name || "主页");

  /* ---------- 首屏 ---------- */
  text("#hero-monogram", cfg.monogram || (cfg.name ? cfg.name.charAt(0) : ""));
  text("#hero-eyebrow", "您好，我是");
  text("#hero-name", cfg.name);
  text("#hero-tagline", cfg.tagline);
  text("#hero-intro", cfg.intro);

  var heroMeta = $("#hero-meta");
  if (heroMeta) {
    var bits = [cfg.location, cfg.availability].filter(Boolean);
    bits.forEach(function (bit, i) {
      if (i > 0) {
        var dot = make("span", "dot", "·");
        dot.setAttribute("aria-hidden", "true");
        heroMeta.appendChild(dot);
      }
      heroMeta.appendChild(document.createTextNode(bit));
    });
  }

  /* ---------- 关于 / 技能 ---------- */
  var aboutBody = $("#about-body");
  if (aboutBody && cfg.about) {
    (cfg.about.paragraphs || []).forEach(function (p) {
      aboutBody.appendChild(make("p", null, p));
    });

    if (cfg.about.skills && cfg.about.skills.length) {
      var skillList = make("div", "skill-list");
      cfg.about.skills.forEach(function (group) {
        var row = make("div", "skill-row");
        row.appendChild(make("span", "skill-group", group.group));
        var items = make("p", "skill-items");
        (group.items || []).forEach(function (item, i) {
          if (i > 0) {
            var sep = make("span", "sep", "·");
            sep.setAttribute("aria-hidden", "true");
            items.appendChild(sep);
          }
          items.appendChild(document.createTextNode(item));
        });
        row.appendChild(items);
        skillList.appendChild(row);
      });
      aboutBody.appendChild(skillList);
    }
  }

  /* ---------- 项目 ---------- */
  var grid = $("#project-grid");
  if (grid && cfg.projects) {
    cfg.projects.forEach(function (p) {
      var card = make("article", "project-card" + (p.featured ? " featured" : ""));

      var top = make("div", "project-top");
      var name = make("h3", "project-name");
      var firstLink = (p.links && p.links[0]) || null;
      if (firstLink) {
        var nameLink = make("a", null, p.name);
        nameLink.href = firstLink.url;
        if (isExternal(firstLink.url)) {
          nameLink.target = "_blank";
          nameLink.rel = "noopener noreferrer";
        }
        name.appendChild(nameLink);
      } else {
        name.textContent = p.name;
      }
      if (p.featured) name.appendChild(make("span", "project-badge", "精选"));
      top.appendChild(name);
      top.appendChild(make("span", "project-year", p.year || ""));
      card.appendChild(top);

      card.appendChild(make("p", "project-desc", p.description));

      var foot = make("div", "project-foot");
      var tags = make("ul", "tag-list");
      (p.tags || []).forEach(function (t) {
        tags.appendChild(make("li", null, t));
      });
      foot.appendChild(tags);

      if (p.links && p.links.length) {
        var links = make("div", "project-links");
        p.links.forEach(function (l) {
          var a = make("a", null);
          a.href = l.url;
          a.appendChild(document.createTextNode(l.label));
          a.insertAdjacentHTML("beforeend", ICONS.arrow);
          if (isExternal(l.url)) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
          }
          links.appendChild(a);
        });
        foot.appendChild(links);
      }
      card.appendChild(foot);
      grid.appendChild(card);
    });
  }

  /* ---------- 联系 ---------- */
  text("#contact-lead",
    "无论是一个想法、一次合作，还是单纯打个招呼——都欢迎写信给我，我会尽快回复。");
  var emailLink = $("#contact-email");
  if (emailLink && cfg.email) {
    emailLink.textContent = cfg.email;
    emailLink.href = "mailto:" + cfg.email;
  }

  var socialList = $("#social-list");
  if (socialList && cfg.socials) {
    cfg.socials.forEach(function (s) {
      var li = make("li");
      var a = make("a", null);
      a.href = s.url;
      if (isExternal(s.url)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.insertAdjacentHTML("beforeend", ICONS[s.icon] || ICONS.link);
      a.appendChild(document.createTextNode(s.label));
      li.appendChild(a);
      socialList.appendChild(li);
    });
  }

  /* ---------- 页脚 ---------- */
  var year = String(new Date().getFullYear());
  var footerLine = $("#footer-line");
  if (footerLine) {
    footerLine.textContent =
      "© " + year + " " + (cfg.name || "") +
      (cfg.footer && cfg.footer.note ? " · " + cfg.footer.note : "");
  }

  /* ---------- 主题切换 ---------- */
  var toggle = $("#theme-toggle");
  if (toggle) {
    var syncPressed = function () {
      toggle.setAttribute("aria-pressed",
        document.documentElement.dataset.theme === "dark" ? "true" : "false");
    };
    syncPressed();
    toggle.addEventListener("click", function () {
      var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncPressed();
    });
  }

  /* ---------- 顶栏滚动态 ---------- */
  var header = $(".site-header");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 滚动渐入 ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".hero > *, .section-head, .section-body, .project-card, .site-footer"
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    targets.forEach(function (t) {
      t.classList.add("reveal-init");
      io.observe(t);
    });
  }
})();
