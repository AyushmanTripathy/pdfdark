console.log("PDF Dark says hello");

let isLightMode = false,
  contrastFactor = 90;

function setInvert() {
  const ratio = isLightMode ? 0 : 1;
  document.querySelectorAll('embed[type="application/pdf"]').forEach((x) => {
    x.style.filter = `invert(${ratio}) contrast(${contrastFactor}%)`;
  });
}

setInvert();
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "toggle":
      isLightMode = !isLightMode;
      setInvert();
      break;
    case "set_contrast":
      contrastFactor = request.contrastFactor;
      setInvert();
      break;
    case "get_info":
      sendResponse({ isLightMode, contrastFactor });
      break;
    default:
      throw "unknown action " + request.action;
  }
});
