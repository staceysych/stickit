const sayHello = async () => {
  const [tab] = await chrome.tabs.query({ active: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      alert("Hello, world!");
    },
  });
};
document.getElementById("myButton").addEventListener("click", sayHello);
