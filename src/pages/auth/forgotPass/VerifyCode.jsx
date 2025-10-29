import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NetworkServices } from "../../../network";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  
  const navigate = useNavigate();

  const handleVerify = async () => {
      const payload = {
    phone: phone,
    code:code, 
  };
    try {
    //   await axios.post("/user/forgot-code-check", { phone, code });
      const response = await NetworkServices.Authentication.forgotpassSend(payload);
        console.log("respxxonse",response)
      navigate("/reset-password");
    } catch (err) {
      alert("Invalid code");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Verify Code</h2>
      <input
        type="number"
        placeholder="Enter phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <input
        type="text"
        placeholder="Enter code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <button onClick={handleVerify} className="bg-green-500 text-white px-4 py-2">
        Verify
      </button>
    </div>
  );
}
