import { titleCase } from "../../utils/common";
import { HTMLData } from "../../types";

const transfer_in_state = () => {
  let vin: string = "";

  try {
    vin = document.querySelectorAll("fieldset")[4].querySelectorAll(".form-control-static")[3].textContent;

    if (!vin) {
      vin = document.querySelectorAll("fieldset")[3].querySelectorAll(".form-control-static")[3].textContent;
    }
  } catch (error) {
    let elements = document.querySelectorAll("fieldset")[4].querySelectorAll(".form-control-static");

    elements.forEach((element, index) => {
      if (element.textContent.length == 17) {
        vin = element.textContent
      }
    });


    if (!vin) {
      let elements = document.querySelectorAll("fieldset")[3].querySelectorAll(".form-control-static");

      elements.forEach((element, index) => {
        if (element.textContent.length == 17) {
          vin = element.textContent
        }
      });
    }

  }


  

  const serviceFees = document.querySelector("#page_modal-collapse-total-other-list dt#label-oth-serv-fee + dd").textContent;
  const totalAch = document.getElementById("val-total-ach").textContent;
  const totalDMV = document.getElementById("val-total-dmv").textContent;

  let lastName = "";
  let firstName = "";

  try {
    lastName = document.querySelector('.form-group label[for="owner-ind-last-name-1"] + div p').textContent;
    firstName = document.querySelector('.form-group label[for="owner-ind-first-name-1"] + div p').textContent;
  } catch (err) {
    lastName = document.querySelector('.form-group label[for="owner-bus-name-1"] + div p').textContent;
  }

  const transactionId = document.querySelector(".tran-id").textContent.substring(9);
  const totalProcessing = document.querySelector("#val-total-processing").textContent;

  const toSend: HTMLData = {
    date: new Date().toString(),
    vin: vin.trim().toUpperCase(),
    serviceFees: serviceFees.trim(),
    totalAch: totalAch.trim(),
    totalDMV: totalDMV.trim(),
    lastName: titleCase(lastName).trim(),
    firstName: titleCase(firstName).trim(),
    transactionId: transactionId.trim(),
    totalProcessing: totalProcessing.trim(),
    registrationType: "Transfer In-State",
  };

  console.log("tosend: ", toSend);

  return toSend;
};

export default transfer_in_state;
