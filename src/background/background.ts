import { Messages } from "../utils/messages";
import { fetchNotes } from "../utils/storage";

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "create-note",
    title: "Create note from selection",
    type: "normal",
    contexts: ["selection"],
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
          pageTitle: tab.title
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

const sendMessagesToAllTabs = (message: IMessage) => {
  const sendToAllTabs = message.data.isSendToAllTabs ? true : false;

  console.log(sendToAllTabs);
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, message, () => chrome.runtime.lastError);
    });
  });
};

const sendMessagesToContentScript = (message: IMessage) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log(tabs);
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
          title: tab.title,
        },
      },
      () => chrome.runtime.lastError
    );

    const notes = await fetchNotes(tab.url);

    chrome.action.setBadgeText({
      text: notes.length.toString(),
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.data.isSendToAllTabs) {
    return sendMessagesToAllTabs(message)
  } 

  sendMessagesToContentScript(message);
});

chrome.storage.onChanged.addListener(async (changes) => {
  const url = Object.keys(changes)[0];
  const notes = await fetchNotes(url);

  await chrome.action.setBadgeText({
    text: notes.length.toString(),
  });
});
