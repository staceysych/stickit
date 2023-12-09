import { Messages } from "../utils/messages";

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  await chrome.tabs.sendMessage(
    tab.id,
    {
      type: Messages.NEW_PAGE,
      data: {
        url: tab.url,
      },
    },
    () => chrome.runtime.lastError
  );
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message.type === Messages.UPDATE_NOTES) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
});
