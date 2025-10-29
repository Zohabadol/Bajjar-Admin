
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Confirmation = ({ title, message, onConfirm, onCancel }) => {
  const showDialog = () => {
    confirmAlert({
      title: title || "Confirm",
      message: message || "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: onConfirm,
        },
        {
          label: "No",
          onClick: onCancel || (() => console.log("Action canceled")),
        },
      ],
    });
  };

  return {
    showDialog,
  };
};

export default Confirmation;
