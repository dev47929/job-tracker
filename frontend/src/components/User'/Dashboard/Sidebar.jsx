import { FiAlignJustify } from "react-icons/fi";


const Sidebar = ()=>{
    return(
    <div className="drawer w-4">
  <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-1" className="btn drawer-button">
<FiAlignJustify />

    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a>Dashboard</a></li>
      <li><a>My Profile</a></li>
    </ul>
  </div>
</div>)
}

export default Sidebar;