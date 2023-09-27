import { titleCase } from "../../utils/common";
import { HTMLData } from "../../types";

const renewal = () => {
  const vin = document.querySelectorAll("fieldset")[4].querySelectorAll(".form-control-static")[3].textContent;
  const serviceFees = document.querySelector("#page_modal-collapse-total-other-list dt#label-oth-serv-fee + dd").textContent;
  const totalAch = document.getElementById("val-total-ach").textContent;
  const totalDMV = document.getElementById("val-total-dmv").textContent;
  const fullName = document.querySelectorAll("fieldset")[4].querySelectorAll(".form-control-static")[5].textContent
  const transactionId = document.querySelector(".tran-id").textContent.substring(9);
  const totalProcessing = document.querySelector("#val-total-processing").textContent;

  const toSend: HTMLData = {
    date: new Date().toString(),
    vin: vin.trim(),
    serviceFees: serviceFees.trim(),
    totalDMV: totalDMV.trim(),
    totalAch: totalAch.trim(),
    fullName: fullName.trim(),
    transactionId: transactionId.trim(),
    totalProcessing: totalProcessing.trim(),
    registrationType: "Renewal",
  };

  return toSend;
};

export default renewal;
