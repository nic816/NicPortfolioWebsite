/* Small, dependency-free interactions for the static portfolio. */
(function () {
  "use strict";

  var root = document.documentElement;
  var header = document.querySelector("[data-header]");
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var siteNav = document.querySelector("[data-site-nav]");
  var navLinks = siteNav ? siteNav.querySelectorAll("a") : [];

  /* Adding .js only after the script has loaded keeps every section visible if JS fails. */
  root.classList.add("js");

  if (menuToggle && siteNav) {
    var closeMenu = function (restoreFocus) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
      document.body.style.overflow = "";
      if (restoreFocus) menuToggle.focus();
    };

    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      siteNav.classList.toggle("is-open", !isOpen);
      document.body.style.overflow = isOpen ? "" : "hidden";
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 800 && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu(false);
      }
    });
  }

  var progressBar = document.querySelector("[data-scroll-progress]");

  if (header) {
    var updateHeader = function () {
      header.classList.toggle("scrolled", window.scrollY > 18);

      if (progressBar) {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        progressBar.style.width = progress + "%";
      }
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader, { passive: true });
  }

  /* Highlight the nav link for the section currently in view. */
  var sectionLinks = [];
  navLinks.forEach(function (link) {
    var href = link.getAttribute("href") || "";
    if (href.charAt(0) === "#" && href.length > 1) {
      var target = document.getElementById(href.slice(1));
      if (target) sectionLinks.push({ link: link, target: target });
    }
  });

  if (sectionLinks.length && "IntersectionObserver" in window) {
    var setActive = function (activeLink) {
      sectionLinks.forEach(function (entry) {
        var isActive = entry.link === activeLink;
        entry.link.classList.toggle("is-active", isActive);
        if (isActive) {
          entry.link.setAttribute("aria-current", "true");
        } else {
          entry.link.removeAttribute("aria-current");
        }
      });
    };

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          for (var i = 0; i < sectionLinks.length; i++) {
            if (sectionLinks[i].target === entry.target) {
              setActive(sectionLinks[i].link);
              break;
            }
          }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sectionLinks.forEach(function (entry) { navObserver.observe(entry.target); });
  }

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px 60px" });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }
}());