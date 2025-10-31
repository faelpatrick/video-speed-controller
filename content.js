const STEP = 0.1;

// Ajusta a velocidade de todos os vídeos na página
function changeSpeed(delta, reset = false) {
  const videos = document.querySelectorAll("video");
  videos.forEach(v => {
    v.playbackRate = reset ? 1 : Math.max(0.1, v.playbackRate + delta);
  });
  if (videos.length) showSpeed(videos[0].playbackRate);
}

// Mostra overlay com a velocidade atual
function showSpeed(rate) {
  let overlay = document.getElementById("speedOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "speedOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "10px";
    overlay.style.right = "10px";
    overlay.style.background = "rgba(0,0,0,0.7)";
    overlay.style.color = "#fff";
    overlay.style.padding = "6px 10px";
    overlay.style.borderRadius = "8px";
    overlay.style.fontSize = "14px";
    overlay.style.fontFamily = "monospace";
    overlay.style.zIndex = "999999";
    document.body.appendChild(overlay);
  }
  overlay.textContent = `Velocidade: ${rate.toFixed(2)}x`;
  clearTimeout(window._speedTimeout);
  window._speedTimeout = setTimeout(() => overlay.remove(), 1000);
}

// Captura atalhos de teclado
document.addEventListener("keydown", e => {
  if (!e.ctrlKey || !e.shiftKey) return;

  switch (e.key) {
    case "ArrowRight": // Acelerar
      changeSpeed(STEP);
      e.preventDefault();
      break;
    case "ArrowLeft": // Desacelerar
      changeSpeed(-STEP);
      e.preventDefault();
      break;
    case "ArrowDown": // Resetar
      changeSpeed(0, true);
      e.preventDefault();
      break;
  }
});
