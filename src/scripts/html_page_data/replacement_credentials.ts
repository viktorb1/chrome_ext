import { titleCase } from "../../utils/common";
import { HTMLData } from "../../types";

const replacement_credentials = () => {
  let vin = document.querySelectorAll("fieldset")[4].querySelectorAll(".form-control-static")[3].textContent;

  if (!vin) {
    vin = document.querySelectorAll("fieldset")[3].querySelectorAll(".form-control-static")[3].textContent;
  }

  const serviceFees = document.querySelector("#page_modal-collapse-total-other-list dt#label-oth-serv-fee + dd").textContent;
  const totalAch = document.getElementById("val-total-ach").textContent;
  const totalDMV = document.getElementById("val-total-dmv").textContent;
  const fullName = document.querySelector('.form-group:nth-child(4) label.control-label.col-sm-4 + div p').textContent


  const transactionId = document.querySelector(".tran-id").textContent.substring(9);
  const totalProcessing = document.querySelector("#val-total-processing").textContent;

  const toSend: HTMLData = {
    date: new Date().toString(),
    vin: vin.trim(),
    serviceFees: serviceFees.trim(),
    totalAch: totalAch.trim(),
    totalDMV: totalDMV.trim(),
    fullName: fullName.trim(),
    transactionId: transactionId.trim(),
    totalProcessing: totalProcessing.trim(),
    registrationType: "Transfer In-State",
  };

  console.log("tosend: ", toSend);

  return toSend;
};

export default replacement_credentials;
