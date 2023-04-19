import { titleCase } from "../../utils/common";
import { HTMLData } from "../../types";

const revived_junk = () => {
  const vin = document.querySelectorAll("fieldset")[5].querySelectorAll(".form-control-static")[1].textContent;
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
    vin: vin.trim(),
    serviceFees: serviceFees.trim(),
    totalAch: totalAch.trim(),
    totalDMV: totalDMV.trim(),
    lastName: titleCase(lastName).trim(),
    firstName: titleCase(firstName).trim(),
    transactionId: transactionId.trim(),
    totalProcessing: totalProcessing.trim(),
    registrationType: "Revived Junk",
  };

  return toSend;
};

export default revived_junk;
