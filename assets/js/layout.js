/* الهيدر والتذييل المشتركان لكل صفحات الموقع.
   مصدر واحد للقائمة — أي تعديل هنا ينعكس على كل الصفحات. */
(function () {
  "use strict";

  /* كل الروابط جذرية بلا امتداد: /products/bathroom
     المسار الحالي يُعلَن في الصفحة كي يعمل في المعاينة أيضاً. */
  var HERE = window.SITE_PATH || location.pathname.replace(/\/index\.html?$/, "/").replace(/\.html?$/, "");
  if (HERE !== "/" && HERE.length > 1) HERE = HERE.replace(/\/$/, "");

  /* ---------- اللغة ---------- */
  var LANG = document.documentElement.lang === "en" ? "en" : "ar";
  var EN = LANG === "en";

  /* نصوص الهيدر والتذييل بالعربية والإنجليزية */
  var T = {
    tagline:   { ar: "مكتب في إسطنبول · نخدم السوق السعودي والخليج",
                 en: "Istanbul office · serving Saudi Arabia and the Gulf" },
    email:     { ar: "البريد الإلكتروني", en: "Email" },
    division:  { ar: "للتشطيبات والتجهيزات", en: "Interiors & Fit-Out" },
    quote:     { ar: "اطلب عرض سعر", en: "Request a quote" },
    menu:      { ar: "القائمة", en: "Menu" },
    mainMenu:  { ar: "القائمة الرئيسية", en: "Main menu" },
    mobMenu:   { ar: "القائمة الرئيسية للجوال", en: "Mobile menu" },
    skip:      { ar: "تخطَّ إلى المحتوى", en: "Skip to content" },
    social:    { ar: "حسابات التواصل الاجتماعي", en: "Social accounts" },
    waAria:    { ar: "تواصل معنا على واتساب", en: "Message us on WhatsApp" },
    switcher:  { ar: "English", en: "العربية" },
    fSupply:   { ar: "مجالات التوريد", en: "What we source" },
    fCompany:  { ar: "الشركة", en: "Company" },
    fContact:  { ar: "العنوان والتواصل", en: "Address & contact" },
    fMarkets:  { ar: "الأسواق", en: "Markets" },
    fBlurb:    { ar: "قسم التشطيبات والتجهيزات — تابع لشركة جاسمين للاستيراد والتصدير.<br>شركة مسجلة في تركيا منذ ",
                 en: "The interiors and fit-out division of Jasmine Import &amp; Export.<br>Registered in Türkiye since " },
    fCity:     { ar: "إسطنبول، تركيا", en: "Istanbul, Türkiye" },
    taxNo:     { ar: "الرقم الضريبي: ", en: "Tax No: " },
    taxOffice: { ar: " — مديرية ضرائب ", en: " — " },
    taxSuffix: { ar: "", en: " Tax Office" },
    rights:    { ar: "جاسمين للاستيراد والتصدير. جميع الحقوق محفوظة.",
                 en: "Jasmine Import &amp; Export. All rights reserved." }
  };
  function t(key) { return T[key][LANG]; }
  var SUF = EN ? "_EN" : "";   // لاحقة مفاتيح العنوان

  /* ---------- بنية القائمة ---------- */
  var P = EN ? "/en" : "";   // بادئة اللغة
  var HOME = EN ? "/en/" : "/";
  var NAV_AR = [
    { label: "الرئيسية", href: EN ? "/en/" : "/" },
    { label: "مجالات التوريد", href: P + "/products", children: [
      { label: "جميع المجالات", href: P + "/products", note: "نظرة عامة على ما نوفّره" },
      { sep: true },
      { label: "تجهيزات الحمام", href: P + "/products/bathroom" },
      { label: "تجهيزات المطاعم والفنادق", href: P + "/products/hospitality" },
      { label: "التشطيبات والإكسسوارات", href: P + "/products/finishes" }
    ]},
    { label: "آلية العمل", href: P + "/process" },
    { label: "لماذا نحن", href: P + "/about#why" },
    { label: "الشركة", href: P + "/about", children: [
      { label: "من نحن", href: P + "/about", note: "من نحن وكيف بدأنا" },
      { label: "فريق العمل", href: P + "/about#team" },
      { label: "سجل الشحنات", href: P + "/shipments" }
    ]},
    { label: "تواصل معنا", href: P + "/contact" }
  ];
  var NAV_EN = [
    { label: "Home", href: EN ? "/en/" : "/" },
    { label: "What we source", href: P + "/products", children: [
      { label: "All areas", href: P + "/products", note: "An overview of what we supply" },
      { sep: true },
      { label: "Bathroom fit-out", href: P + "/products/bathroom" },
      { label: "Restaurant & hotel fit-out", href: P + "/products/hospitality" },
      { label: "Finishes & hardware", href: P + "/products/finishes" }
    ]},
    { label: "How we work", href: P + "/process" },
    { label: "Why us", href: P + "/about#why" },
    { label: "Company", href: P + "/about", children: [
      { label: "About us", href: P + "/about", note: "Who we are and how we started" },
      { label: "The team", href: P + "/about#team" },
      { label: "Shipment record", href: P + "/shipments" }
    ]},
    { label: "Contact", href: P + "/contact" }
  ];
  var NAV = EN ? NAV_EN : NAV_AR;

  var FOOT_SUPPLY = EN ? [
      ["Bathroom fit-out", P + "/products/bathroom"],
      ["Restaurant & hotel fit-out", P + "/products/hospitality"],
      ["Finishes & hardware", P + "/products/finishes"]
    ] : [
      ["تجهيزات الحمام", P + "/products/bathroom"],
      ["تجهيزات المطاعم والفنادق", P + "/products/hospitality"],
      ["التشطيبات والإكسسوارات", P + "/products/finishes"]
    ];
  var FOOT_COMPANY = EN ? [
      ["About us", P + "/about"], ["How we work", P + "/process"],
      ["FAQ", P + "/faq"], ["Shipment record", P + "/shipments"], ["Contact", P + "/contact"]
    ] : [
      ["من نحن", P + "/about"], ["آلية العمل", P + "/process"],
      ["الأسئلة الشائعة", P + "/faq"], ["سجل الشحنات", P + "/shipments"], ["تواصل معنا", P + "/contact"]
    ];

  var FOOT_MARKETS = EN ? null : [
      ["السعودية", "/markets/saudi-arabia"],
      ["الرياض", "/markets/saudi-arabia/riyadh"],
      ["جدة", "/markets/saudi-arabia/jeddah"],
      ["الدمام", "/markets/saudi-arabia/dammam"],
      ["الإمارات", "/markets/uae"],
      ["قطر", "/markets/qatar"],
      ["الكويت", "/markets/kuwait"]
    ];

  /* رابط تبديل اللغة: نفس المسار مع تبديل بادئة اللغة */
  function switcherHref() {
    if (EN) { var rest = HERE.replace(/^\/en/, ""); return rest || "/"; }
    return HERE === "/" ? "/en/" : "/en" + HERE;
  }

  function url(href) { return href; }
  function isCurrent(href) {
    var path = href.split("#")[0];
    if (path !== "/" && path.length > 1) path = path.replace(/\/$/, "");
    return path === HERE;
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
    '<a class="skip-link" href="#main">' + t("skip") + '</a>' +
    '<div class="topstrip"><div class="wrap">' +
      '<span>' + t("tagline") + '</span>' +
      '<span class="ts-links">' +
        '<a data-email data-email-text href="mailto:">' + t("email") + '</a>' +
        '<a class="lang-switch" href="' + switcherHref() + '" lang="' + (EN ? "ar" : "en") + '">' +
          t("switcher") + '</a>' +
      '</span>' +
    '</div></div>' +
    '<header class="site-header">' +
      '<div class="header-main"><div class="wrap">' +
        '<a class="lockup" href="' + HOME + '">' +'<span class="logo-mark" aria-hidden="true">J</span>' +'<span class="logo-type"><b>JASMINE</b><span>' + t("division") + '</span></span>' +'</a>' +
        '<nav aria-label="' + t("mainMenu") + '"><ul class="nav">' + desktop + '</ul></nav>' +
        '<div class="nav-cta">' +
          '<a class="btn btn-sm" data-wa data-icon="whatsapp" href="' + (P + "/contact") + '">' + t("quote") + '</a>' +
          '<button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav" ' +
          'aria-label="' + t("menu") + '"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div></div>' +
      '<nav class="mobile-nav" id="mobile-nav" aria-label="' + t("mobMenu") + '">' +
        '<ul>' + mobile + '</ul>' +
        '<div class="m-cta"><a class="btn" data-wa data-icon="whatsapp" href="' +
        (P + "/contact") + '">' + t("quote") + '</a></div>' +
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
          '<a class="lockup" href="' + HOME + '">' +
            '<span class="logo-mark" aria-hidden="true">J</span>' +
            '<span class="logo-type"><b>JASMINE</b><span>' + t("division") + '</span></span>' +
          '</a>' +
          '<p>' + t("fBlurb") +
          '<span class="fill" data-env="FOUNDED_YEAR"' + (EN ? "" : " data-ar-digits") + '>2023</span>.</p></div>' +
        '<div><strong>' + t("fSupply") + '</strong>' + links(FOOT_SUPPLY) + '</div>' +
        '<div><strong>' + t("fCompany") + '</strong>' + links(FOOT_COMPANY) + '</div>' +
        (FOOT_MARKETS ? '<div><strong>' + t("fMarkets") + '</strong>' + links(FOOT_MARKETS) + '</div>' : "") +
        '<div><strong>' + t("fContact") + '</strong>' +
          '<p><span class="fill" data-env="ADDRESS_STREET' + SUF + '">-</span><br>' +
          '<span class="fill" data-env="ADDRESS_DISTRICT' + SUF + '">-</span> \u2014 ' +
          '<span class="fill" data-env="ADDRESS_REGION' + SUF + '">-</span><br>' +
          t("fCity") + '<br>' +
          '<a data-email data-email-text href="mailto:">' + t("email") + '</a></p></div>' +
      '</div>' +
      '<div class="fsocial"><ul class="social social-footer" data-social-footer aria-label="' + t("social") + '"></ul></div>' +
      '<div class="legal">' +
        '<span data-env="COMPANY_LEGAL_NAME" dir="ltr"></span><br>' +
        t("taxNo") + '<span class="fill" data-env="TAX_NUMBER">-</span>' + t("taxOffice") +
        '<span class="fill" data-env="TAX_OFFICE">-</span>' + t("taxSuffix") + '<br>' +
        '\u00A9 <span id="yr">2026</span> ' + t("rights") +
      '</div>' +
    '</div></footer>' +
    '<a class="wa-float" data-wa data-icon="whatsapp" href="' + (P + "/contact") +
    '" aria-label="' + t("waAria") + '"></a>';
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
