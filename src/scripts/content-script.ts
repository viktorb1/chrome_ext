chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "clicked-action-button") {
    console.log("received");
    const registrationType = document
      .querySelector(".nav-header")!
      .textContent?.trim();

    if (registrationType == "Transfer In-State") {
      const vin = document.querySelector(
        '.form-group label[for="transfer-vehicle-vin"] + div p'
      )!.textContent;
      const serviceFees = document.querySelector(
        "#page_modal-collapse-total-other-list dt#label-oth-serv-fee + dd"
      )!.textContent;
      const totalAch = document.getElementById("val-total-ach")!.textContent;
      const lastName = document.querySelector(
        '.form-group label[for="owner-ind-last-name-1"] + div p'
      )!.textContent;
      const firstName = document.querySelector(
        '.form-group label[for="owner-ind-first-name-1"] + div p'
      )!.textContent;

      const transactionId = document
        .querySelector(".tran-id")!
        .textContent?.substring(9);

      const totalProcessing = document.querySelector(
        "#val-total-processing"
      ).textContent;

      const toSend = {
        date: new Date().toString(),
        vin: vin.trim(),
        serviceFees: serviceFees.trim(),
        totalAch: totalAch.trim(),
        lastName: lastName.trim(),
        firstName: firstName.trim(),
        registrationType: registrationType.trim(),
        transactionId: transactionId.trim(),
        totalProcessing: totalProcessing.trim(),
      };

      console.log("here it is");
      console.log(toSend);
      chrome.storage.local.set({ [transactionId!]: toSend }, () => {
        chrome.storage.local.set({ current: transactionId }, () => {
          chrome.runtime.sendMessage("new-tab");
        });
      });
    }
  }
});

export {};
