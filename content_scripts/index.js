console.log("PDF Dark says hello");

/**
 * @param {number} ratio
 */

let isLightMode = false, contrastFactor = 0.45;

function setInvert() {
  const ratio = (isLightMode ? -1 : 1) * contrastFactor + 0.5;
  document.querySelectorAll("embed").forEach((x) => {
    x.style.filter = `invert(${ratio})`;
  });
}

setInvert();
chrome.runtime.onMessage.addListener((request) => {
  switch (request.action) {
    case "toggle":
      isLightMode = !isLightMode;
      setInvert();
      break;
    case "set_contrast":
      contrastFactor = request.contrastFactor;
      setInvert()
      break;
    default:
      throw "unknown action " + request.action;
  }
});

