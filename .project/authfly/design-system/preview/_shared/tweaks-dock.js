/**
 * Tweaks Dock — Claude Design-style live design playground.
 *
 * Renders a floating panel from the brandTweaks manifest (8 axes), wires up
 * keyboard shortcuts (T = theme, A = accent, D = density, R = radius, X = depth,
 * M = motion, S = scale, F = surface, ? = help), View Transitions for smooth
 * paint, and ARIA dialog semantics.
 *
 * Auto-instantiates on DOMContentLoaded; renders nothing if window.brandTweaks
 * is missing (graceful degradation).
 */
(function () {
  "use strict";

  var SHORTCUTS = {
    KeyT: "theme",
    KeyA: "accent",
    KeyD: "density",
    KeyR: "radius",
    KeyX: "depth",
    KeyM: "motion",
    KeyS: "typeScale",
    KeyF: "surfaceTexture",
  };

  var ICONS = {
    theme: "latty-sun",
    accent: "latty-sparkles",
    density: "latty-boxes",
    radius: "latty-box",
    depth: "latty-server",
    motion: "latty-history",
    typeScale: "latty-menu",
    surfaceTexture: "latty-message-circle",
  };

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        if (key === "class") node.className = props[key];
        else if (key === "html") node.innerHTML = props[key];
        else if (key.indexOf("on") === 0) node.addEventListener(key.slice(2).toLowerCase(), props[key]);
        else if (key.indexOf("data-") === 0 || key.indexOf("aria-") === 0) node.setAttribute(key, props[key]);
        else node[key] = props[key];
      });
    }
    if (children) {
      children.forEach(function (child) {
        if (child == null) return;
        node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
      });
    }
    return node;
  }

  function withTransition(fn) {
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(fn);
    } else {
      fn();
    }
  }

  function buildAxisRow(axisName, axisDef, currentValue, onSelect) {
    var shortcut = Object.keys(SHORTCUTS).find(function (k) {
      return SHORTCUTS[k] === axisName;
    });
    var keyChar = shortcut ? shortcut.replace("Key", "").toLowerCase() : "";

    var optionEntries = Object.entries(axisDef.options);

    var optionButtons = optionEntries.map(function (entry) {
      var optionKey = entry[0];
      var optionDef = entry[1];
      var isActive = optionKey === currentValue;

      var children = [];

      if (axisName === "theme") {
        var bg = optionDef.vars && (optionDef.vars["--background"] || optionDef.vars["--card"]);
        if (bg) {
          children.push(el("span", { class: "tweaks-swatch", style: "background:" + bg }));
        }
      } else if (axisName === "accent") {
        var ac = optionDef.vars && optionDef.vars["--accent"];
        if (ac) {
          children.push(el("span", { class: "tweaks-swatch", style: "background:" + ac }));
        }
      }

      children.push(document.createTextNode(optionDef.label || optionKey));

      return el(
        "button",
        {
          type: "button",
          class: "tweaks-option",
          "aria-pressed": isActive ? "true" : "false",
          "data-axis": axisName,
          "data-value": optionKey,
          onclick: function () {
            onSelect(axisName, optionKey);
          },
        },
        children
      );
    });

    return el("div", { class: "tweaks-axis tweaks-axis--" + axisName, "data-axis": axisName }, [
      el("div", { class: "tweaks-axis__label" }, [
        document.createTextNode(axisDef.label || axisName),
        keyChar ? el("kbd", null, [keyChar.toUpperCase()]) : null,
      ]),
      el("div", { class: "tweaks-axis__options", role: "radiogroup", "aria-label": axisDef.label || axisName }, optionButtons),
    ]);
  }

  function showToast(label) {
    var toast = document.querySelector(".tweaks-toast");
    if (!toast) return;
    toast.innerHTML = label;
    toast.setAttribute("data-visible", "true");
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.setAttribute("data-visible", "false");
    }, 1400);
  }

  function init() {
    if (!window.brandTweaks || !window.__brandTweaksAxes) {
      console.warn("[tweaks-dock] brandTweaks runtime not loaded — dock disabled.");
      return;
    }

    var axes = window.__brandTweaksAxes;
    var state = window.brandTweaks.getState();

    var launcher = el(
      "button",
      {
        type: "button",
        class: "tweaks-dock-launcher",
        "aria-expanded": "false",
        "aria-controls": "tweaks-dock-panel",
        "aria-label": "Open design tweaks",
        title: "Design Tweaks (press ? for shortcuts)",
      },
      [el("i", { class: "latty latty-sparkles", "aria-hidden": "true" })]
    );

    var dock = el("aside", {
      class: "tweaks-dock",
      id: "tweaks-dock-panel",
      role: "dialog",
      "aria-label": "Design Tweaks",
      "aria-modal": "false",
      "data-open": "false",
    });

    var body = el("div", { class: "tweaks-dock__body" });

    function rerender() {
      state = window.brandTweaks.getState();
      body.innerHTML = "";
      Object.keys(axes).forEach(function (axisName) {
        body.appendChild(
          buildAxisRow(axisName, axes[axisName], state[axisName], function (axis, value) {
            withTransition(function () {
              window.brandTweaks.set(axis, value);
            });
            // Rerender to reflect aria-pressed states.
            window.requestAnimationFrame(rerender);
          })
        );
      });
    }

    var header = el("div", { class: "tweaks-dock__header" }, [
      el("p", { class: "tweaks-dock__title" }, [
        el("i", { class: "latty latty-sparkles", "aria-hidden": "true" }),
        el("strong", null, ["Design Tweaks"]),
      ]),
      el("div", { class: "tweaks-dock__actions" }, [
        el(
          "button",
          {
            type: "button",
            class: "tweaks-dock__icon-btn",
            "aria-label": "Close tweaks",
            onclick: function () {
              setOpen(false);
            },
          },
          [el("span", { html: "&times;", style: "font-size:1.125rem;line-height:1" })]
        ),
      ]),
    ]);

    var footer = el("div", { class: "tweaks-dock__footer" }, [
      el("span", { class: "tweaks-dock__footer-hint" }, [
        document.createTextNode("Press "),
        el("kbd", { style: "font-family:ui-monospace,monospace;font-size:.6875rem;padding:0 .3125rem;border:1px solid var(--border);border-radius:.25rem;" }, ["?"]),
        document.createTextNode(" for shortcuts"),
      ]),
      el(
        "button",
        {
          type: "button",
          class: "tweaks-dock__reset",
          onclick: function () {
            withTransition(function () {
              window.brandTweaks.reset();
              window.requestAnimationFrame(rerender);
            });
            showToast("Reset to <strong>defaults</strong>");
          },
        },
        ["Reset"]
      ),
    ]);

    dock.appendChild(header);
    dock.appendChild(body);
    dock.appendChild(footer);

    var toast = el("div", { class: "tweaks-toast", role: "status", "aria-live": "polite" });

    document.body.appendChild(toast);
    document.body.appendChild(dock);
    document.body.appendChild(launcher);

    function setOpen(open) {
      dock.setAttribute("data-open", open ? "true" : "false");
      launcher.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) rerender();
    }

    launcher.addEventListener("click", function () {
      var isOpen = dock.getAttribute("data-open") === "true";
      setOpen(!isOpen);
    });

    // Esc closes the dock.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      // Ignore typing in inputs.
      var target = event.target;
      var tag = target && target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (target && target.isContentEditable)) return;

      if (event.key === "?" || (event.shiftKey && event.code === "Slash")) {
        event.preventDefault();
        setOpen(true);
        showToast("Shortcuts: <strong>T A D R X M S F</strong> — cycle axis");
        return;
      }

      var axisName = SHORTCUTS[event.code];
      if (axisName && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        var nextState;
        withTransition(function () {
          nextState = window.brandTweaks.cycle(axisName);
        });
        if (dock.getAttribute("data-open") === "true") {
          window.requestAnimationFrame(rerender);
        }
        var newValue = nextState[axisName];
        var labelDef = axes[axisName] && axes[axisName].options[newValue];
        var prettyLabel = labelDef ? labelDef.label : newValue;
        showToast((axes[axisName].label || axisName) + " → <strong>" + prettyLabel + "</strong>");
      }
    });
  }

  ready(init);
})();
