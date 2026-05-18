import { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 234-567-8900");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Save profile data to backend
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">My Profile</h1>
        <p className="text-slate-400 text-sm">Manage your account information and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-slate-800 border border-slate-700/50 p-8 rounded-2xl shadow-xl max-w-2xl">
        {/* Profile Avatar */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-4xl text-white font-bold">JD</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-slate-450 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-450 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-slate-450 mb-2">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-10">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition cursor-pointer shadow-lg shadow-indigo-500/20"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition cursor-pointer shadow-lg shadow-green-500/20"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-650 text-white rounded-xl font-semibold transition cursor-pointer border border-slate-600"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 rounded-xl font-semibold transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
