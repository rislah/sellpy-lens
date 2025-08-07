// ==UserScript==
// @name         Sellpy Lens
// @namespace    sellpy-lens
// @version      0.1
// @description  Search items on Sellpy with Google Lens
// @author       You
// @match        https://www.sellpy.com/item/*
// ==/UserScript==

(function () {
  "use strict";

  const observer = new MutationObserver(() => {
    const carousel = document.querySelector("#carousel");
    const image = carousel?.querySelector("img");

    if (!carousel || !image) return;

    const { alt: title, src: url } = image;

    const wrapper = document.querySelector(".sc-hMxIkD.jXDLnL");
    if (!wrapper || wrapper.querySelector("#lensButton")) return;

    const targetDiv = wrapper.querySelector(
      "div:not([class]) > div:not([class])",
    );
    if (targetDiv) {
      addLensButton(targetDiv, url, title);
    }
  });

  function startObserving() {
    observer.disconnect();
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function addLensButton(parentElement, imageUrl, imageTitle) {
    const button = document.createElement("button");

    Object.assign(button, {
      id: "lensButton",
      textContent: "Search with Google Lens",
      className: "sc-dcJsrY fPOWjY",
    });

    Object.assign(button.style, {
      minWidth: "auto",
      padding: "0px 16px",
    });

    button.addEventListener("click", () => {
      const searchUrl = new URL("https://lens.google.com/uploadbyurl");
      searchUrl.searchParams.set("url", imageUrl);
      searchUrl.searchParams.set("q", imageTitle);

      window.open(searchUrl, "_blank");
    });

    parentElement.appendChild(button);
  }

  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if (url.includes("sellpy.com/item")) {
        startObserving();
      }
    }
  }).observe(document, { subtree: true, childList: true });

  startObserving();
})();
