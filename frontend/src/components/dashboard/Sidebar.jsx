import { FiHome, FiUser, FiBriefcase, FiSettings, FiTarget } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-slate-800 border-r border-slate-700 flex flex-col shadow-sm">
      {/* Logo / Title */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">Job Tracker</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to={"/user/dashboard/applications"}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-slate-700 transition"
            >
              <FiBriefcase size={20} />
              <span>Applications</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/user/dashboard/profile"}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-slate-700 transition"
            >
              <FiUser size={20} />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/user/dashboard/match-jobs"}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-slate-700 transition"
            >
              <FiTarget size={20} />
              <span>Match Jobs</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 text-sm text-gray-400">
        © 2026 Job Tracker
      </div>
    </div>
  );
};

export default Sidebar;
