// Thin bridge: theme button delegates to window.brandTweaks (single source of truth).
// Smoothly switches via View Transitions API where supported.
(function () {
  var root = document.documentElement;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
      return;
    }
    fn();
  }

  function currentTheme() {
    if (window.brandTweaks && typeof window.brandTweaks.getState === "function") {
      var state = window.brandTweaks.getState();
      return state.theme || root.getAttribute("data-theme") || "dark";
    }
    return root.getAttribute("data-theme") || "dark";
  }

  function setTheme(next) {
    if (window.brandTweaks && typeof window.brandTweaks.set === "function") {
      window.brandTweaks.set("theme", next);
    } else {
      root.setAttribute("data-theme", next);
    }
  }

  function applyButtonState() {
    var icon = document.getElementById("theme-toggle-icon");
    var button = document.getElementById("ui8kit-theme-toggle");
    var isDark = currentTheme() === "dark";

    var switchToDark =
      button && button.dataset.switchToDarkLabel
        ? button.dataset.switchToDarkLabel
        : "Switch to dark theme";
    var switchToLight =
      button && button.dataset.switchToLightLabel
        ? button.dataset.switchToLightLabel
        : "Switch to light theme";

    if (icon) {
      icon.className = isDark
        ? "ui-theme-icon latty latty-sun"
        : "ui-theme-icon latty latty-moon";
    }

    if (button) {
      button.setAttribute("aria-pressed", isDark ? "true" : "false");
      button.setAttribute("title", isDark ? switchToLight : switchToDark);
      button.setAttribute("aria-label", isDark ? switchToLight : switchToDark);
    }
  }

  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";

    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(function () {
        setTheme(next);
        applyButtonState();
      });
      return;
    }

    setTheme(next);
    applyButtonState();
  }

  ready(function () {
    var themeButton = document.getElementById("ui8kit-theme-toggle");
    if (themeButton) {
      themeButton.addEventListener("click", toggleTheme);
    }

    // Listen for tweaks dock changes to keep button icon in sync.
    window.addEventListener("message", function (event) {
      if (event.data && event.data.type === "brand-os-tweak" && event.data.axis === "theme") {
        applyButtonState();
      }
    });

    applyButtonState();
  });
})();
