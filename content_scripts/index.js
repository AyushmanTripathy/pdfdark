console.log("PDF Dark says hello");

document.querySelectorAll("embed").forEach(x => {
  x.style.filter = "invert(0.95)";
})
