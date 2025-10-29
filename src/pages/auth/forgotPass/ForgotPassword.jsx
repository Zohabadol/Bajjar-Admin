import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NetworkServices } from "../../../network";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
    //   await axios.post("/auth/account/verify/sms-send", { phone });
    const response = await NetworkServices.Authentication.forgotpass({phone:phone});
    console.log("respxxonse",response)
      localStorage.setItem("reset_phone", phone);
      navigate("/verify-code");
    } catch (err) {
      alert("Failed to send code");
      console.log(err)
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <button onClick={handleSendCode} className="bg-blue-500 text-white px-4 py-2">
        Send Code
      </button>
    </div>
  );
}
