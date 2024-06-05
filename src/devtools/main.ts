
// chrome.devtools.panels.create("Sample Panel", "icon.png", "../options.html", panel => {
//   // code invoked on panel creation
//   console.log("===🐛=== ~ panel:", panel);
// });

chrome.devtools.panels.create(
  "华通云",
  "icon.png",
  "../dist/panel/index.html",
  function (panel) {
    console.log("DevTools panel created.");
  }
);