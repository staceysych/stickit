import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Messages } from "../utils/messages";
import "./contentScript.css";

import Note from "../components/Note";

const App: React.FC<{}> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleMessages = ({ type }) => {
    console.log(type);
    if (type === Messages.NEW_NOTE) {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessages);
    };
  }, [isActive]);

  return <>{isActive && <Note />}</>;
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
