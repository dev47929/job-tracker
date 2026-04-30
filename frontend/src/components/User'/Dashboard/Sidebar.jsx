import { FiHome, FiUser, FiBriefcase, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      
      {/* Logo / Title */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">
          Job Tracker
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">  
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <FiHome size={20} />
              <span>Dashboard</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <FiBriefcase size={20} />
              <span>Applications</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <FiUser size={20} />
              <span>Profile</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <FiSettings size={20} />
              <span>Settings</span>
            </a>
          </li>

        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 text-sm text-gray-500">
        © 2026 Job Tracker
      </div>
    </div>
  );
};

export default Sidebar;