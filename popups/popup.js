const toggleButton = document.getElementById("toggleButton");
const toggleSVG = toggleButton.querySelector("img");

let mode = "light_mode";

function toogleMode() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggle" });
      mode = mode == "dark_mode" ? "light_mode" : "dark_mode";
      toggleSVG.src = `svgs/${mode}.svg`;
    }
  );
}

toggleButton.addEventListener("click", toogleMode);
