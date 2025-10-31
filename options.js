document.addEventListener("DOMContentLoaded", async () => {
  const data = await chrome.storage.sync.get(["increaseKey", "decreaseKey"]);
  document.getElementById("increaseKey").value = data.increaseKey || "Control+Shift+.";
  document.getElementById("decreaseKey").value = data.decreaseKey || "Control+Shift+,";
});

document.getElementById("save").addEventListener("click", async () => {
  const increaseKey = document.getElementById("increaseKey").value.trim();
  const decreaseKey = document.getElementById("decreaseKey").value.trim();
  await chrome.storage.sync.set({ increaseKey, decreaseKey });
  alert("Atalhos salvos com sucesso!");
});
