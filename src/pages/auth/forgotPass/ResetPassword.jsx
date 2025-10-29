import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const phone = localStorage.getItem("reset_phone");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (newPass !== confirmPass) {
      return alert("Passwords do not match!");
    }

    try {
      await axios.post("/user/forgot-password-update", {
        phone,
        new_password: newPass,
        confirm_password: confirmPass,
      });
      localStorage.removeItem("reset_phone");
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert("Failed to reset password");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <button onClick={handleReset} className="bg-purple-500 text-white px-4 py-2">
        Update Password
      </button>
    </div>
  );
}
