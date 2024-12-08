const toggleButton = document.getElementById("toggleButton");
const toggleSVG = toggleButton?.querySelector("img");
const contrastSlider = document.querySelector("input[type='range']");

let isLightMode;
let contrastFactor;

function updateUI() {
  if (!toggleSVG) throw "toggleSVG is null";
  toggleSVG.src = `svgs/${isLightMode ? "dark_mode" : "light_mode"}.svg`;
  contrastSlider.value = contrastFactor;
}

function toogleMode() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggle" });
      isLightMode = !isLightMode;
      updateUI();
    }
  );
}

function handleContrastChange() {
  contrastFactor = contrastSlider.value;
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "set_contrast", contrastFactor });
    }
  );
}

contrastSlider?.addEventListener("change", handleContrastChange);
toggleButton.addEventListener("click", toogleMode);
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "get_info" }, (info) => {
    isLightMode = info.isLightMode;
    contrastFactor = info.contrastFactor;
    updateUI();
  });
});
