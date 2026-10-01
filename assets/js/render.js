/* ==========================================================================
   实用工具箱 · 页面渲染脚本
   所有文案与下载数据都来自 data/site.js（window.SITE_DATA），本文件只负责渲染。
   改文案请改 data/site.js，不要改这里。
   ========================================================================== */
(function () {
  'use strict';

  var D = window.SITE_DATA;
  if (!D) {
    document.body.insertAdjacentHTML('afterbegin',
      '<p style="padding:24px;color:#f87171">未找到 data/site.js，页面数据加载失败。</p>');
    return;
  }

  /* ---------------- 小工具 ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function mount(id, html) {
    var node = document.getElementById(id);
    if (node) { node.innerHTML = html; return node; }
    return null;
  }

  var toastTimer = null;
  function toast(msg) {
    var t = $('#toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1900);
  }

  function copyText(text, okMsg) {
    function done() { toast(okMsg || '已复制到剪贴板'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast('复制失败，请手动选择复制'); }
      document.body.removeChild(ta);
    }
  }

  // 本站内页链接：在首页时把 index.html#x 简化为 #x，避免整页重载
  function localHref(href) {
    if (!href) { return '#'; }
    if (isHome() && href.indexOf('index.html#') === 0) { return href.slice('index.html'.length); }
    return href;
  }

  function isHome() { return (document.body.getAttribute('data-page') || 'home') === 'home'; }
  function appIdOnPage() { return document.body.getAttribute('data-app') || ''; }
  function findApp(id) {
    for (var i = 0; i < D.apps.length; i++) { if (D.apps[i].id === id) { return D.apps[i]; } }
    return null;
  }
  function downloadOf(appId) {
    for (var i = 0; i < D.downloads.items.length; i++) {
      if (D.downloads.items[i].appId === appId) { return D.downloads.items[i]; }
    }
    return null;
  }

  function bindCopyButtons(root) {
    var btns = (root || document).querySelectorAll('[data-copy]');
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('click', function () {
        copyText(b.getAttribute('data-copy'), b.getAttribute('data-copy-msg') || '已复制到剪贴板');
        var old = b.textContent;
        b.classList.add('ok');
        b.textContent = '已复制';
        setTimeout(function () { b.classList.remove('ok'); b.textContent = old; }, 1500);
      });
    });
  }

  /* ---------------- 通用区块 ---------------- */
  function renderNav() {
    var repoLink = '';
    if (D.site.repo) {
      repoLink = '<a class="btn btn-ghost btn-sm" href="' + esc(D.site.repo) +
        '" target="_blank" rel="noopener">★ GitHub 仓库</a>';
    }
    var links = D.nav.links.map(function (l) {
      return '<a href="' + esc(localHref(l.href)) + '">' + esc(l.label) + '</a>';
    }).join('');
    var html =
      '<div class="container nav-inner">' +
        '<a class="logo" href="index.html">' +
          '<img src="assets/img/logo.png" alt="' + esc(D.site.name) + '">' +
          '<span>' + esc(D.site.name) + '<small>' + esc(D.site.en) + ' · 三款 Windows 工具</small></span>' +
        '</a>' +
        '<div class="nav-links" id="navLinks">' + links + '</div>' +
        '<div class="nav-cta">' + repoLink +
          '<a class="btn btn-primary btn-sm" href="' + esc(localHref(D.nav.cta.href)) + '">' +
            esc(D.nav.cta.label) + '</a>' +
          '<button id="navToggle" aria-label="菜单">☰</button>' +
        '</div>' +
      '</div>';
    var nav = document.getElementById('site-nav');
    if (nav) { nav.innerHTML = html; }
    var toggle = $('#navToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var box = $('#navLinks');
        if (box) { box.classList.toggle('open'); }
      });
    }
  }

  function renderFooter() {
    var cols = D.footer.cols.map(function (c) {
      return '<div><h4>' + esc(c.title) + '</h4><div>' + c.html + '</div></div>';
    }).join('');
    var yearEl = document.getElementById('year');
    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
    var f = document.getElementById('site-footer');
    if (!f) { return; }
    f.innerHTML = '<div class="container"><div class="foot-grid">' + cols +
      '</div><div class="foot-note">' + D.footer.note.replace('<span id="year"></span>',
        '<span>' + new Date().getFullYear() + '</span>') + '</div></div>';
  }

  function renderHero() {
    var h = D.hero;
    var tags = h.tags.map(function (t) { return '<span class="badge">' + esc(t) + '</span>'; }).join('');
    var btns = h.buttons.map(function (b) {
      return '<a class="btn ' + esc(b.btnClass || 'btn-ghost') + '" href="' + esc(localHref(b.href)) + '">' +
        esc(b.text) + '</a>';
    }).join('');
    var stats = (h.stats || []).map(function (s) {
      return '<div class="stat"><b>' + esc(s.num) + '</b><span>' + esc(s.label) + '</span></div>';
    }).join('');
    mount('hero-root',
      '<div class="container"><div class="hero-inner">' +
        '<span class="badge accent">' + esc(h.badge) + '</span>' +
        '<h1>' + h.titleHtml + '</h1>' +
        '<p class="tagline">' + h.tagline + '</p>' +
        '<div class="tags">' + tags + '</div>' +
        '<div class="hero-btns">' + btns + '</div>' +
        '<div class="hero-meta">' + esc(h.meta) + '</div>' +
      '</div></div>' +
      '<div class="container"><div class="stats">' + stats + '</div></div>');
  }

  function renderAppCards() {
    var cards = D.apps.map(function (a) {
      var dl = downloadOf(a.id) || {};
      var chips = a.highlights.slice(0, 4).map(function (t) {
        return '<span class="chip">' + esc(t) + '</span>';
      }).join('');
      var sizeText = '安装包 ' + esc(dl.size || a.sizeText);
      if (a.extraDownload) { sizeText += ' + 解码器 ' + esc(a.extraDownload.size); }
      return '<article class="app-card" style="--app-accent:' + esc(a.accent) + '">' +
        '<div class="top">' +
          '<img src="' + esc(a.icon) + '" alt="' + esc(a.name) + '">' +
          '<div><h3>' + esc(a.name) + '</h3><div class="ver">' + esc(a.version) +
            ' · ' + esc(a.date) + '</div></div>' +
        '</div>' +
        '<p class="slogan">' + esc(a.tagline) + '</p>' +
        '<div class="chips">' + chips + '</div>' +
        '<div class="meta"><span>' + sizeText + '</span><span>Windows 10/11 64 位</span></div>' +
        '<div class="actions">' +
          '<a class="btn btn-primary btn-sm" href="' + esc(a.download.url) + '" download>⬇ 下载</a>' +
          '<a class="btn btn-ghost btn-sm" href="' + esc(a.id) + '.html">查看详情</a>' +
        '</div>' +
      '</article>';
    }).join('');
    mount('apps-root', '<div class="app-grid">' + cards + '</div>');
  }

  function renderShared() {
    var s = D.shared;
    var items = s.items.map(function (i) {
      return '<div class="f-card"><div class="f-ic">' + i.icon + '</div>' +
        '<h3>' + esc(i.name) + '</h3><p>' + i.desc + '</p></div>';
    }).join('');
    mount('shared-root',
      '<div class="sec-head"><h2>' + esc(s.title) + '</h2><p class="sec-sub">' + esc(s.subtitle) + '</p></div>' +
      '<div class="features">' + items + '</div>');
  }

  function renderDownloadList() {
    var d = D.downloads;
    var rows = d.items.map(function (it) {
      return '<div class="dl-row">' +
        '<div>' +
          '<div class="name">' + esc(it.name) +
            '<span class="badge">' + esc(it.version) + '</span>' +
            '<span class="badge">' + esc(it.size) + '</span>' +
          '</div>' +
          '<div class="file">' + esc(it.file) + '</div>' +
          '<div class="sha">SHA256 ' + esc(it.sha256) +
            ' <button class="copy-btn" data-copy="' + esc(it.sha256) + '" data-copy-msg="SHA256 已复制">复制</button>' +
          '</div>' +
        '</div>' +
        '<div class="right">' +
          '<span class="size">' + esc(it.date) + ' 更新</span>' +
          '<a class="btn btn-primary btn-sm" href="' + esc(it.url) + '" download>⬇ 下载安装包</a>' +
          '<a class="btn btn-ghost btn-sm" href="' + esc(it.appId) + '.html">查看详情</a>' +
        '</div>' +
      '</div>';
    }).join('');
    mount('downloads-root',
      '<div class="sec-head"><h2>' + esc(d.title) + '</h2><p class="sec-sub">' + esc(d.subtitle) + '</p></div>' +
      '<div class="dl-list">' + rows + '</div>' +
      '<div class="note"><b>校验方法：</b>' + d.note + '</div>');
  }

  function renderFaq(targetId, faq) {
    var items = faq.items.map(function (i) {
      return '<details class="qa"' + (i.open ? ' open' : '') + '><summary>' + esc(i.q) +
        '</summary><div class="a">' + i.a + '</div></details>';
    }).join('');
    mount(targetId,
      '<div class="sec-head"><h2>' + esc(faq.title) + '</h2><p class="sec-sub">' + esc(faq.subtitle) + '</p></div>' +
      '<div class="faq-list">' + items + '</div>');
  }

  function renderSupport() {
    var s = D.support;
    var plats = s.platforms.map(function (p) {
      var btn = p.url
        ? '<a class="btn ' + esc(p.btnClass || 'btn-primary') + '" href="' + esc(p.url) +
          '" target="_blank" rel="noopener">' + esc(p.button) + '</a>'
        : '<span class="badge">' + esc(p.pending || '即将开放') + '</span>';
      return '<div class="support-card" style="margin-bottom:14px">' +
        '<h3>' + p.icon + ' ' + esc(p.name) + '</h3><p>' + esc(p.desc) + '</p>' +
        '<div class="mt24">' + btn + '</div></div>';
    }).join('');
    var chips = s.freeChips.map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join('');
    mount('support-root',
      '<div class="sec-head"><h2>' + esc(s.title) + '</h2><p class="sec-sub">' + esc(s.subtitle) + '</p></div>' +
      '<div class="support-wrap">' +
        '<div>' + plats +
          '<div class="support-card"><h3>' + esc(s.freeTitle) + '</h3>' +
            '<div class="chips-row">' + chips + '</div></div>' +
        '</div>' +
        '<div class="support-card qr-card">' +
          '<h3>' + esc(s.qr.title) + '</h3>' +
          '<img src="' + esc(s.qr.image) + '" alt="' + esc(s.qr.title) + '">' +
          '<div class="hint">' + esc(s.qr.hint) + '</div>' +
        '</div>' +
      '</div>');
  }

  /* ---------------- 产品详情页 ---------------- */
  function renderAppPage(app) {
    var dl = downloadOf(app.id) || {};
    var chips = app.highlights.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('');
    var feats = app.features.map(function (f) {
      return '<div class="f-card"><div class="f-ic">' + f.icon + '</div>' +
        '<h3>' + esc(f.name) + '</h3><p>' + f.desc + '</p></div>';
    }).join('');
    var steps = app.usage.steps.map(function (s) {
      return '<div class="step"><div class="no">' + esc(s.no) + '</div>' +
        '<h3>' + esc(s.name) + '</h3><p>' + esc(s.desc) + '</p></div>';
    }).join('');
    var tables = (app.tables || []).map(function (t) {
      var head = t.columns.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('');
      var body = t.rows.map(function (r) {
        return '<tr>' + r.map(function (c, i) {
          return i === 0 ? '<td><b>' + esc(c) + '</b></td>' : '<td>' + esc(c) + '</td>';
        }).join('') + '</tr>';
      }).join('');
      return '<div class="tbl-block"><h3>' + esc(t.title) + '</h3>' +
        '<div class="sub">' + esc(t.subtitle) + '</div>' +
        '<div class="tbl-wrap"><table class="tbl"><thead><tr>' + head +
        '</tr></thead><tbody>' + body + '</tbody></table></div></div>';
    }).join('');

    var cli = '';
    if (app.usage.cliBlocks) {
      cli = '<div class="tbl-block"><h3>' + esc(app.usage.cliTitle || '命令行') + '</h3>' +
        app.usage.cliBlocks.map(function (b) {
          return '<div class="cmd-block">' + esc(b) +
            '<button class="copy-btn" data-copy="' + esc(b) + '">复制</button></div>';
        }).join('') + '</div>';
    }

    mount('app-hero-root',
      '<div class="container">' +
        '<div class="crumb"><a href="index.html">首页</a> / ' + esc(app.short) + '</div>' +
        '<div class="app-hero">' +
          '<div>' +
            '<div class="head">' +
              '<img src="' + esc(app.icon) + '" alt="' + esc(app.name) + '">' +
              '<div><h1>' + esc(app.name) + '</h1>' +
              '<div class="verline">' + esc(app.version) + ' · 更新于 ' + esc(app.date) +
              ' · 安装包 ' + esc(dl.size || app.sizeText) + ' · Windows 10 / 11 64 位</div></div>' +
            '</div>' +
            '<p class="tagline">' + esc(app.tagline) + '</p>' +
            '<p class="summary">' + esc(app.summary) + '</p>' +
            '<div class="chips" style="margin-top:16px">' + chips + '</div>' +
            '<div class="actions">' +
              '<a class="btn btn-primary" href="' + esc(app.download.url) + '" download>⬇ 下载安装包（' +
                esc(dl.size || app.sizeText) + '）</a>' +
              (app.extraDownload ? '<a class="btn btn-primary" href="' + esc(app.extraDownload.url) +
                '" download>⬇ ' + esc(app.extraDownload.label) + '（' + esc(app.extraDownload.size) +
                '）</a>' : '') +
              '<a class="btn btn-ghost" href="index.html#download">查看全部下载</a>' +
            '</div>' +
          '</div>' +
          '<aside class="side-card">' +
            '<h3>文件信息</h3>' +
            '<div class="kv"><span>安装包</span><b>' + esc(app.download.file) + '</b></div>' +
            '<div class="kv"><span>大小</span><b>' + esc(dl.size || app.sizeText) + '</b></div>' +
            '<div class="kv"><span>版本</span><b>' + esc(app.version) + '</b></div>' +
            '<div class="kv"><span>更新日期</span><b>' + esc(app.date) + '</b></div>' +
            '<div class="kv"><span>系统要求</span><b>Windows 10 / 11 64 位</b></div>' +
            '<div class="kv"><span>安装方式</span><b>中文向导（Inno Setup）</b></div>' +
            '<div class="kv"><span>SHA256</span><b class="mono">' + esc(app.download.sha256) + '</b></div>' +
            '<button class="btn btn-ghost btn-sm btn-block mt24" data-copy="' + esc(app.download.sha256) +
              '" data-copy-msg="SHA256 已复制">复制校验值</button>' +
            '<p class="sec-sub" style="margin:12px 0 0;font-size:12.5px">' + esc(app.download.note) + '</p>' +
          '</aside>' +
        '</div>' +
      '</div>');

    mount('app-features-root',
      '<div class="sec-head"><h2>功能特性</h2><p class="sec-sub">' + esc(app.tagline) + '</p></div>' +
      '<div class="features">' + feats + '</div>');

    mount('app-tables-root', tables);
    mount('app-usage-root',
      '<div class="sec-head"><h2>' + esc(app.usage.title) + '</h2><p class="sec-sub">' +
        esc(app.short) + ' 的典型使用流程</p></div>' +
      '<div class="steps">' + steps + '</div>' + cli);

    var faqItems = app.faq.map(function (i) {
      return '<details class="qa"' + (i.open ? ' open' : '') + '><summary>' + esc(i.q) +
        '</summary><div class="a">' + i.a + '</div></details>';
    }).join('');
    mount('app-faq-root',
      '<div class="sec-head"><h2>常见问题</h2><p class="sec-sub">关于 ' + esc(app.short) +
        ' 的疑问与解答</p></div>' +
      '<div class="faq-list">' + faqItems + '</div>');

    var chg = app.changelog;
    mount('app-changelog-root',
      '<div class="sec-head"><h2>' + esc(chg.version) + ' 更新日志</h2><p class="sec-sub">' +
        esc(chg.date) + ' · ' + esc(chg.badge) + '</p></div>' +
      '<div class="faq-list"><div class="support-card"><ul style="margin:0;padding-left:20px;color:var(--muted);font-size:14px;line-height:2">' +
        chg.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') +
      '</ul></div></div>');

    mount('app-download-root',
      '<div class="sec-head"><h2>下载安装包</h2><p class="sec-sub">' + esc(app.version) +
        ' · ' + esc(dl.size || app.sizeText) + (app.extraDownload ? ' + 解码器 ' +
        esc(app.extraDownload.size) : '') + ' · Windows 10 / 11 64 位</p></div>' +
      '<div class="dl-list"><div class="dl-row">' +
        '<div>' +
          '<div class="name">' + esc(app.name) + '<span class="badge">' + esc(app.version) + '</span></div>' +
          '<div class="file">' + esc(app.download.file) + ' · ' + esc(dl.size || app.sizeText) + '</div>' +
          '<div class="sha">SHA256 ' + esc(app.download.sha256) + '</div>' +
        '</div>' +
        '<div class="right">' +
          '<a class="btn btn-primary btn-sm" href="' + esc(app.download.url) + '" download>⬇ 下载安装包</a>' +
          '<a class="btn btn-ghost btn-sm" href="index.html#download">其它软件</a>' +
        '</div>' +
      '</div>' +
      (app.extraDownload ? (function () {
        var ex = null;
        for (var i = 0; i < D.downloads.items.length; i++) {
          if (D.downloads.items[i].file === app.extraDownload.file) { ex = D.downloads.items[i]; }
        }
        return '<div class="dl-row">' +
          '<div>' +
            '<div class="name">' + esc((ex && ex.name) || app.extraDownload.label) +
              '<span class="badge">' + esc(app.extraDownload.size) + '</span>' +
              '<span class="badge">组件</span></div>' +
            '<div class="file">' + esc(app.extraDownload.file) + '</div>' +
            '<div class="sha">SHA256 ' + esc((ex && ex.sha256) || '') + '</div>' +
          '</div>' +
          '<div class="right">' +
            '<a class="btn btn-primary btn-sm" href="' + esc(app.extraDownload.url) +
              '" download>⬇ 下载解码器</a>' +
          '</div>' +
        '</div>';
      })() : '') +
      '</div>');

    document.title = app.name + ' ' + app.version + ' 下载 - ' + D.site.name;
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    renderNav();
    if (isHome()) {
      renderHero();
      renderAppCards();
      renderShared();
      renderDownloadList();
      renderFaq('faq-root', D.faq);
      renderSupport();
    } else {
      var app = findApp(appIdOnPage());
      if (app) {
        renderAppPage(app);
      } else {
        mount('app-hero-root', '<div class="container"><p>未找到该软件，请返回<a href="index.html">首页</a>。</p></div>');
      }
      renderSupport();
    }
    renderFooter();
    bindCopyButtons(document);

    var y = document.getElementById('year');
    if (y) { y.textContent = new Date().getFullYear(); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
