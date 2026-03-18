import { X } from "lucide-react";

export default function ProfileModal({ isOpen, onClose, user, onLogout }) {
  if (!isOpen) return null;

  const firstLetter = user?.name?.charAt(0)?.toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-[90%] max-w-sm p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-semibold">
            {firstLetter}
          </div>

          <h3 className="mt-3 text-lg font-semibold text-gray-900">
            {user?.name || "User"}
          </h3>

          <p className="text-sm text-gray-500">
            +91 {user?.mobile}
          </p>
        </div>

        {/* Divider */}
        <div className="my-5 border-t" />

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
