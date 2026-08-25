/* موقع جاسمين للتشطيبات — يقرأ env.js ويملأ الروابط والبيانات */
(function () {
  "use strict";

  var ENV = window.ENV || {};
  var BASE = window.SITE_BASE || "";
  function asset(path) {
    if (!path) return "";
    return /^(https?:|\/|data:)/.test(path) ? path : BASE + path;
  }

  /* ---------- أدوات مساعدة ---------- */
  /* كل القيم متغيرات مسطّحة في env.js — val("EMAIL") تقرأ ENV.EMAIL */
  function val(key) {
    var v = ENV[key];
    return typeof v === "string" ? v.trim() : v != null ? String(v) : "";
  }
  var AR_DIGITS = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
  function toArabicDigits(str) {
    return String(str).replace(/[0-9]/g, function (d) { return AR_DIGITS[+d]; });
  }
  function waLink(num) {
    if (!num) return "";
    num = String(num).trim();
    if (/^https?:\/\//i.test(num)) return num;
    var digits = num.replace(/[^\d]/g, "");
    return digits ? "https://wa.me/" + digits : "";
  }
  function telLink(num) {
    if (!num) return "";
    var digits = String(num).replace(/[^\d+]/g, "");
    return digits ? "tel:" + (digits[0] === "+" ? digits : "+" + digits) : "";
  }

  /* ---------- الأيقونات (خطية، 24×24) ---------- */
  var S = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    whatsapp:
      '<path ' + S + ' d="M12 3.6a8.4 8.4 0 0 0-7.2 12.7L3.6 20.4l4.2-1.1A8.4 8.4 0 1 0 12 3.6z"/>' +
      '<path fill="currentColor" d="M9.5 8.5c-.15 0-.4.06-.6.28-.24.26-.62.63-.62 1.53 0 .9.64 1.78.73 1.9.1.13 1.26 2.03 3.12 2.83 1.5.64 1.85.55 2.19.52.4-.04 1.1-.45 1.26-.9.16-.44.16-.82.11-.9-.05-.08-.18-.13-.38-.23l-1.1-.53c-.16-.07-.28-.03-.4.11l-.5.65c-.09.11-.19.13-.34.06a5.3 5.3 0 0 1-2.1-2.06c-.07-.13-.02-.22.06-.3l.35-.42c.09-.11.1-.2.05-.33l-.5-1.2c-.1-.25-.2-.24-.32-.25l-.11-.01z"/>',
    instagram:
      '<rect ' + S + ' x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/>' +
      '<circle ' + S + ' cx="12" cy="12" r="4.1"/>' +
      '<circle fill="currentColor" cx="17" cy="7" r="1.05"/>',
    linkedin:
      '<rect ' + S + ' x="3.2" y="3.2" width="17.6" height="17.6" rx="3.4"/>' +
      '<circle fill="currentColor" cx="8.2" cy="8.4" r="1"/>' +
      '<path ' + S + ' d="M8.2 11.1v6.5"/>' +
      '<path ' + S + ' d="M12.3 17.6v-6.5"/>' +
      '<path ' + S + ' d="M12.3 14.3c0-1.8 1.2-3.2 2.9-3.2s2.9 1.4 2.9 3.2v3.3"/>',
    facebook:
      '<rect ' + S + ' x="3.2" y="3.2" width="17.6" height="17.6" rx="3.4"/>' +
      '<path ' + S + ' d="M15.1 7.6h-1.4c-.9 0-1.6.7-1.6 1.6v8.6"/>' +
      '<path ' + S + ' d="M10.3 12.1h4.3"/>',
    x:
      '<path ' + S + ' d="M4.6 4.6 19.4 19.4"/>' +
      '<path ' + S + ' d="M19.4 4.6 4.6 19.4"/>',
    tiktok:
      '<path ' + S + ' d="M13.9 3.6v10.1a3.6 3.6 0 1 1-3.2-3.58"/>' +
      '<path ' + S + ' d="M13.9 3.6c.35 2.3 1.9 3.9 4.3 4.2"/>',
    youtube:
      '<rect ' + S + ' x="2.6" y="5.6" width="18.8" height="12.8" rx="4"/>' +
      '<path fill="currentColor" d="M10.4 9.3 15.6 12l-5.2 2.7z"/>',
    telegram:
      '<path ' + S + ' d="M21.3 4.3 2.9 11.2l5.5 2 1.8 5.6 2.8-3.4z"/>' +
      '<path ' + S + ' d="m8.4 13.2 12.9-8.9"/>',
    email:
      '<rect ' + S + ' x="2.6" y="5" width="18.8" height="14" rx="2"/>' +
      '<path ' + S + ' d="m3.2 6.2 8.8 6.4 8.8-6.4"/>',
    phone:
      '<path ' + S + ' d="M6.1 4.3h2.6l1.3 3.3-1.7 1.2a10.6 10.6 0 0 0 4.9 4.9l1.2-1.7 3.3 1.3v2.6c0 .9-.8 1.7-1.7 1.6C9.2 17 7 14.8 4.5 6c-.1-.9.7-1.7 1.6-1.7z"/>',
    maps:
      '<path ' + S + ' d="M12 21s6.8-6.2 6.8-10.8a6.8 6.8 0 1 0-13.6 0C5.2 14.8 12 21 12 21z"/>' +
      '<circle ' + S + ' cx="12" cy="10.1" r="2.5"/>',
    check:
      '<path ' + S + ' d="m4 12.4 5.2 5.2L20 6.8"/>',
    clock:
      '<circle ' + S + ' cx="12" cy="12" r="8.6"/>' +
      '<path ' + S + ' d="M12 7.2V12l3.2 2"/>'
  };
  var LABELS = {
    whatsapp: "واتساب", instagram: "إنستغرام", linkedin: "لينكدإن",
    facebook: "فيسبوك", x: "إكس", tiktok: "تيك توك", youtube: "يوتيوب",
    telegram: "تيليغرام", email: "البريد الإلكتروني", phone: "هاتف", maps: "الموقع على الخريطة",
    check: "", clock: "ساعات العمل"
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || "") + "</svg>";
  }
  window.JASMINE_ICON = icon;

  /* ---------- تعبئة النصوص من الإعدادات ---------- */
  document.querySelectorAll("[data-env]").forEach(function (el) {
    var v = val(el.getAttribute("data-env"));
    if (v) {
      el.textContent = el.hasAttribute("data-ar-digits") ? toArabicDigits(v) : v;
      el.classList.remove("fill");
    }
  });

  /* ---------- روابط الواتساب ---------- */
  var mainWa = waLink(val("WHATSAPP_MAIN"));
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    if (mainWa) el.setAttribute("href", mainWa);
    else el.setAttribute("href", "#contact");
  });

  /* ---------- البريد والقسم الغذائي والخريطة ---------- */
  var email = val("EMAIL");
  document.querySelectorAll("[data-email]").forEach(function (el) {
    if (email) {
      el.setAttribute("href", "mailto:" + email);
      if (el.hasAttribute("data-email-text")) el.textContent = email;
    } else if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  });
  var food = val("FOOD_DIVISION_URL");
  document.querySelectorAll("[data-food]").forEach(function (el) {
    if (food) el.setAttribute("href", food);
  });

  /* ---------- الفريق: الأسماء والصور وروابط الواتساب ---------- */
  var team = [
    { name: val("PARTNER_1_NAME"), photo: val("PARTNER_1_PHOTO"), whatsapp: val("PARTNER_1_WHATSAPP") },
    { name: val("PARTNER_2_NAME"), photo: val("PARTNER_2_PHOTO"), whatsapp: val("PARTNER_2_WHATSAPP") }
  ];
  document.querySelectorAll("[data-person]").forEach(function (card, i) {
    var p = team[i] || {};
    var nameEl = card.querySelector("[data-person-name]");
    if (nameEl && p.name) { nameEl.textContent = p.name; nameEl.classList.remove("fill"); }

    var numEl = card.querySelector("[data-person-wa-text]");
    if (numEl && p.whatsapp) {
      numEl.textContent = String(p.whatsapp).trim();
      numEl.classList.remove("fill");
    }

    var link = card.querySelector("[data-person-wa]");
    if (link) {
      var url = waLink(p.whatsapp) || mainWa;
      link.setAttribute("href", url || "#contact");
    }

    var box = card.querySelector(".avatar");
    var img = box && box.querySelector("img");
    if (img && p.photo) {
      img.addEventListener("load", function () { box.classList.add("has-photo"); });
      img.addEventListener("error", function () { box.classList.remove("has-photo"); });
      img.setAttribute("src", asset(p.photo));
      if (p.name) img.setAttribute("alt", p.name);
    }
  });

  /* ---------- السوشيال ميديا ---------- */
  var SOCIAL_VARS = {
    instagram: "INSTAGRAM", linkedin: "LINKEDIN", facebook: "FACEBOOK",
    tiktok: "TIKTOK", youtube: "YOUTUBE", x: "X", telegram: "TELEGRAM"
  };
  function socialUrl(key) { return key === "whatsapp" ? mainWa : val(SOCIAL_VARS[key]); }

  var order = ["whatsapp", "instagram", "linkedin", "facebook", "tiktok", "youtube", "x", "telegram"];
  var items = [];

  order.forEach(function (key) {
    var url = socialUrl(key);
    if (url) items.push({ key: key, url: url });
  });
  if (email) items.push({ key: "email", url: "mailto:" + email });
  var phone = telLink(val("PHONE"));
  if (phone) items.push({ key: "phone", url: phone });
  var maps = val("MAPS_URL");
  if (maps) items.push({ key: "maps", url: maps });

  document.querySelectorAll("[data-social]").forEach(function (list) {
    list.innerHTML = items.map(function (it) {
      var ext = /^https?:/i.test(it.url) ? ' target="_blank" rel="noopener"' : "";
      return '<li><a href="' + it.url + '"' + ext + ' aria-label="' + LABELS[it.key] +
             '" title="' + LABELS[it.key] + '">' + icon(it.key) + "</a></li>";
    }).join("");
  });

  /* ---------- صف التواصل الاجتماعي في التذييل ----------
     ترتيب ثابت من خمس منصات. الرابط غير المعبّأ في env.js يبقى
     عنصراً نائباً ظاهراً ليسهل العثور عليه واستبداله. */
  var FOOTER_SOCIAL = [
    ["tiktok",    "[رابط-تيك-توك]"],
    ["instagram", "[رابط-إنستجرام]"],
    ["x",         "[رابط-إكس]"],
    ["facebook",  "[رابط-فيسبوك]"],
    ["linkedin",  "[رابط-لينكد-إن]"]
  ];
  document.querySelectorAll("[data-social-footer]").forEach(function (list) {
    list.innerHTML = FOOTER_SOCIAL.map(function (row) {
      var key = row[0], url = socialUrl(key) || row[1];
      var ext = /^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : "";
      return '<li><a href="' + url + '"' + ext + ' aria-label="' + LABELS[key] +
             '" title="' + LABELS[key] + '">' + icon(key) + "</a></li>";
    }).join("");
  });


  /* ---------- قائمة وسائل التواصل (صفحة تواصل معنا) ---------- */
  document.querySelectorAll("[data-contact-list]").forEach(function (list) {
    var rows = [];
    rows.push(["whatsapp", "واتساب",
      mainWa ? val("WHATSAPP_MAIN") : '<span class="fill">[رقم-الواتساب]</span>', mainWa]);
    if (email)  rows.push(["email", "البريد الإلكتروني", email, "mailto:" + email]);
    if (phone)  rows.push(["phone", "هاتف المكتب", val("PHONE"), phone]);

    var addr = [val("ADDRESS_STREET"), val("ADDRESS_DISTRICT"),
                val("ADDRESS_REGION")].filter(Boolean).join("، ");
    rows.push(["maps", "العنوان",
      (addr ? addr + "<br>" : "") + "إسطنبول، تركيا", maps || ""]);

    var hours = val("WORK_HOURS");
    if (hours) rows.push(["clock", "ساعات العمل", hours, ""]);

    list.innerHTML = rows.map(function (r) {
      var body = r[3]
        ? '<a href="' + r[3] + '"' + (/^https?:/i.test(r[3]) ? ' target="_blank" rel="noopener"' : "") + '>' + r[2] + "</a>"
        : "<span>" + r[2] + "</span>";
      return "<li>" + icon(r[0]) + "<div><strong>" + r[1] + "</strong>" + body + "</div></li>";
    }).join("");
  });

  /* ---------- علامة الصح داخل القوائم ---------- */
  document.querySelectorAll(".check-list li").forEach(function (li) {
    if (!li.querySelector("svg")) li.insertAdjacentHTML("afterbegin", icon("check"));
  });

  /* ---------- أيقونات داخل الأزرار ---------- */
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    el.insertAdjacentHTML("afterbegin", icon(el.getAttribute("data-icon")));
  });

  /* ---------- زر الواتساب العائم ---------- */
  var float = document.querySelector(".wa-float");
  if (float) {
    if (mainWa) float.setAttribute("href", mainWa);
    else float.remove();
  }

  /* ---------- السنة ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- ظهور العناصر عند التمرير ---------- */
  var nodes = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  nodes.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i, 5) * 0.07 + "s";
    io.observe(el);
  });
})();
