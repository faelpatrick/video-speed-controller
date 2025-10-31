document.addEventListener("DOMContentLoaded", async () => {
  try {
    // obtém aba ativa com await
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      document.getElementById("currentRate").textContent = "Nenhuma aba ativa.";
      return;
    }

    // executa script para pegar a velocidade do vídeo
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const video = document.querySelector("video");
        return video ? video.playbackRate : null;
      }
    });

    const el = document.getElementById("currentRate");
    if (!results || !results[0] || results[0].result === null) {
      el.textContent = "Nenhum vídeo detectado.";
    } else {
      el.textContent = `Velocidade atual: ${results[0].result.toFixed(2)}x`;
    }

  } catch (err) {
    document.getElementById("currentRate").textContent = 
      `Erro: ${err.message || "não foi possível ler o vídeo."}`;
  }
});
