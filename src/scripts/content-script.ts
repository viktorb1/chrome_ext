import transfer_in_state from "./html_page_data/transfer_in_state";
import transfer_out_of_state from "./html_page_data/transfer_out_of_state";
import renewal from "./html_page_data/renewal";
import revived_junk from "./html_page_data/revived_junk";

import { HTMLData } from "../types";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "clicked-action-button") {
    console.log("you clicked print button");
    const registrationType = document.querySelector(".nav-header").textContent.trim();

    let toSend: HTMLData;
    if (registrationType == "Transfer In-State") {
      toSend = transfer_in_state();
    } else if (registrationType == "Transfer Out-of-State") {
      toSend = transfer_out_of_state();
    } else if (registrationType == "Renewal") {
      toSend = renewal();
    } else if (registrationType == "Revived Junk") {
      toSend = revived_junk();
    } else {
      toSend = transfer_in_state();
    }

    toSend.registrationType = registrationType.trim();

    console.log("collected data from HTML form");
    console.log(toSend);

    chrome.storage.sync.set({ [toSend.transactionId]: toSend }, () => {
      chrome.storage.sync.set({ current: toSend.transactionId }, () => {
        chrome.runtime.sendMessage("new-tab");
      });
    });
  }
});

export {};
