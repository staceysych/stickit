import { Messages } from "../utils/messages";

interface IMessage {
  type: Messages;
  data: any;
}

const sendMessagesToContentScript = (message: IMessage) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        message,
        () => chrome.runtime.lastError
      );
    }
  });
};

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
  if (tab.id) {
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
  }
});

chrome.runtime.onMessage.addListener((message) => {
  sendMessagesToContentScript(message);
});
