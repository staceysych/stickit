import { Messages } from "../utils/messages";

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
      id: 'create-note',
      title: "Create note from selection",
      type: 'normal',
      contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener(async (item, tab) => {
  const { selectionText } = item;

  if (tab.id) {
    await chrome.tabs.sendMessage(
      tab.id,
      {
        type: Messages.NEW_NOTE,
        data: {
          content: selectionText,
        },
      },
      () => chrome.runtime.lastError
    );
  }
});

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
