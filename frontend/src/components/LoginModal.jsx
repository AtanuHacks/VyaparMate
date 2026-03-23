import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        name,
        mobile,
      });

      login(res.data.token, res.data.user);
      onClose();
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <input
          type="text"
          placeholder="Shopkeeper Name"
          className="w-full border p-2 mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full border p-2 mb-4 rounded"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>

        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-500 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}