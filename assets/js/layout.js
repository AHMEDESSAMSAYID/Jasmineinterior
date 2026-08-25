/* الهيدر والتذييل المشتركان لكل صفحات الموقع.
   مصدر واحد للقائمة — أي تعديل هنا ينعكس على كل الصفحات. */
(function () {
  "use strict";

  var BASE = window.SITE_BASE || "";          // "" في الجذر، "../" داخل مجلد products
  var HERE = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var INPRODUCTS = /\/products\//.test(location.pathname) || window.SITE_BASE === "../";

  /* ---------- بنية القائمة ---------- */
  var NAV = [
    { label: "الرئيسية", href: "index.html" },
    { label: "مجالات التوريد", href: "products/index.html", children: [
      { label: "جميع المجالات", href: "products/index.html", note: "نظرة عامة على ما نوفّره" },
      { sep: true },
      { label: "تجهيزات الحمام", href: "products/bathroom.html" },
      { label: "تجهيزات المطاعم والفنادق", href: "products/hospitality.html" },
      { label: "التشطيبات والإكسسوارات", href: "products/finishes.html" }
    ]},
    { label: "آلية العمل", href: "process.html" },
    { label: "لماذا نحن", href: "about.html#why" },
    { label: "الشركة", href: "about.html", children: [
      { label: "من نحن", href: "about.html", note: "من نحن وكيف بدأنا" },
      { label: "فريق العمل", href: "about.html#team" },
      { label: "سجل الشحنات", href: "shipments.html" }
    ]},
    { label: "تواصل معنا", href: "contact.html" }
  ];

  function url(href) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    return BASE + href;
  }
  function isCurrent(href) {
    var file = href.split("#")[0].split("/").pop().toLowerCase();
    var inProdLink = href.indexOf("products/") === 0;
    if (inProdLink !== INPRODUCTS) return false;
    return file === HERE;
  }
  function branchActive(item) {
    if (isCurrent(item.href)) return true;
    return (item.children || []).some(function (c) { return c.href && isCurrent(c.href); });
  }

  var CARET = '<svg class="caret" viewBox="0 0 12 12" aria-hidden="true">' +
    '<path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- الهيدر ---------- */
  function header() {
    var desktop = NAV.map(function (item, i) {
      var cls = branchActive(item) ? " class=\"current\"" : "";
      if (!item.children) {
        return '<li' + cls + '><a href="' + url(item.href) + '">' + item.label + '</a></li>';
      }
      var sub = item.children.map(function (c) {
        if (c.sep) return '<li class="sub-sep" aria-hidden="true"></li>';
        return '<li><a href="' + url(c.href) + '">' + c.label +
               (c.note ? '<span class="sub-note">' + c.note + '</span>' : '') + '</a></li>';
      }).join("");
      var id = "submenu-" + i;
      return '<li' + cls + '>' +
        '<a href="' + url(item.href) + '" aria-haspopup="true" aria-expanded="false" ' +
        'aria-controls="' + id + '">' + item.label + CARET + '</a>' +
        '<ul class="submenu" id="' + id + '">' + sub + '</ul></li>';
    }).join("");

    var mobile = NAV.map(function (item, i) {
      if (!item.children) {
        return '<li><a href="' + url(item.href) + '">' + item.label + '</a></li>';
      }
      var sub = item.children.filter(function (c) { return !c.sep; }).map(function (c) {
        return '<a href="' + url(c.href) + '">' + c.label + '</a>';
      }).join("");
      return '<li>' +
        '<button class="m-toggle" type="button" aria-expanded="false" aria-controls="m-sub-' + i + '">' +
        item.label + CARET + '</button>' +
        '<div class="m-sub" id="m-sub-' + i + '">' + sub + '</div></li>';
    }).join("");

    return '' +
    '<a class="skip-link" href="#main">تخطَّ إلى المحتوى</a>' +
    '<div class="topstrip"><div class="wrap">' +
      '<span>مكتب في إسطنبول · نخدم السوق السعودي والخليج</span>' +
      '<span class="ts-links">' +
        '<a data-email data-email-text href="mailto:">البريد الإلكتروني</a>' +
      '</span>' +
    '</div></div>' +
    '<header class="site-header">' +
      '<div class="header-main"><div class="wrap">' +
        '<a class="lockup" href="' + url("index.html") + '">' +'<span class="logo-mark" aria-hidden="true">J</span>' +'<span class="logo-type"><b>JASMINE</b><span>للتشطيبات والتجهيزات</span></span>' +'</a>' +
        '<nav aria-label="القائمة الرئيسية"><ul class="nav">' + desktop + '</ul></nav>' +
        '<div class="nav-cta">' +
          '<a class="btn btn-sm" data-wa data-icon="whatsapp" href="' + url("contact.html") + '">اطلب عرض سعر</a>' +
          '<button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav" ' +
          'aria-label="القائمة"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div></div>' +
      '<nav class="mobile-nav" id="mobile-nav" aria-label="القائمة الرئيسية للجوال">' +
        '<ul>' + mobile + '</ul>' +
        '<div class="m-cta"><a class="btn" data-wa data-icon="whatsapp" href="' +
        url("contact.html") + '">اطلب عرض سعر</a></div>' +
      '</nav>' +
    '</header>';
  }

  /* ---------- التذييل ---------- */
  function footer() {
    function links(items) {
      return '<ul class="flinks">' + items.map(function (it) {
        return '<li><a href="' + url(it[1]) + '">' + it[0] + '</a></li>';
      }).join("") + '</ul>';
    }
    return '<footer class="s-dark"><div class="wrap">' +
      '<div class="fgrid">' +
        '<div>' +
          '<a class="lockup" href="' + url("index.html") + '">' +
            '<span class="logo-mark" aria-hidden="true">J</span>' +
            '<span class="logo-type"><b>JASMINE</b><span>للتشطيبات والتجهيزات</span></span>' +
          '</a>' +
          '<p>قسم التشطيبات والتجهيزات — تابع لشركة جاسمين للاستيراد والتصدير.<br>' +
          'شركة مسجلة في تركيا منذ <span class="fill" data-env="FOUNDED_YEAR" data-ar-digits>[٢٠١٧]</span>.</p></div>' +
        '<div><strong>مجالات التوريد</strong>' + links([
          ["تجهيزات الحمام", "products/bathroom.html"],
          ["تجهيزات المطاعم والفنادق", "products/hospitality.html"],
          ["التشطيبات والإكسسوارات", "products/finishes.html"]
        ]) + '</div>' +
        '<div><strong>الشركة</strong>' + links([
          ["من نحن", "about.html"],
          ["آلية العمل", "process.html"],
          ["سجل الشحنات", "shipments.html"],
          ["تواصل معنا", "contact.html"]
        ]) + '</div>' +
        '<div><strong>العنوان والتواصل</strong>' +
          '<p><span class="fill" data-env="ADDRESS_STREET">[اسم الشارع ورقم المبنى]</span><br>' +
          '<span class="fill" data-env="ADDRESS_DISTRICT">[الحي]</span> — ' +
          '<span class="fill" data-env="ADDRESS_REGION">[المنطقة]</span><br>' +
          'إسطنبول، تركيا<br>' +
          '<a data-email href="mailto:">البريد الإلكتروني</a></p></div>' +
      '</div>' +
      '<div class="fsocial"><ul class="social social-footer" data-social-footer aria-label="حسابات التواصل الاجتماعي"></ul></div>' +
      '<div class="legal">' +
        '<span data-env="COMPANY_LEGAL_NAME" dir="ltr"></span><br>' +
        'الرقم الضريبي: <span class="fill" data-env="TAX_NUMBER">[الرقم الضريبي]</span> — ' +
        'مديرية ضرائب <span class="fill" data-env="TAX_OFFICE">[المديرية]</span><br>' +
        '© <span id="yr">2026</span> جاسمين للاستيراد والتصدير. جميع الحقوق محفوظة.' +
      '</div>' +
    '</div></footer>' +
    '<a class="wa-float" data-wa data-icon="whatsapp" href="' + url("contact.html") +
    '" aria-label="تواصل معنا على واتساب"></a>';
  }

  /* ---------- الحقن ---------- */
  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }
  mount("site-header", header());
  mount("site-footer", footer());

  /* ---------- تفاعل القائمة ---------- */
  var items = [].slice.call(document.querySelectorAll(".nav > li"));

  function closeAll(except) {
    items.forEach(function (li) {
      if (li === except) return;
      li.classList.remove("open");
      var a = li.querySelector("[aria-haspopup]");
      if (a) a.setAttribute("aria-expanded", "false");
    });
  }
  items.forEach(function (li) {
    var trigger = li.querySelector("[aria-haspopup]");
    if (!trigger) return;
    function open(state) {
      li.classList.toggle("open", state);
      trigger.setAttribute("aria-expanded", state ? "true" : "false");
      if (state) closeAll(li);
    }
    li.addEventListener("mouseenter", function () { open(true); });
    li.addEventListener("mouseleave", function () { open(false); });
    li.addEventListener("focusin", function () { open(true); });
    trigger.addEventListener("click", function (e) {
      // النقرة الأولى تفتح القائمة بدل الانتقال — تفيد شاشات اللمس
      if (!li.classList.contains("open")) { e.preventDefault(); open(true); }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav")) closeAll(null);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll(null);
  });

  /* ---------- قائمة الجوال ---------- */
  var burger = document.querySelector(".burger");
  var drawer = document.getElementById("mobile-nav");
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    [].forEach.call(drawer.querySelectorAll(".m-toggle"), function (btn) {
      btn.addEventListener("click", function () {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        var open = panel.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }
})();
