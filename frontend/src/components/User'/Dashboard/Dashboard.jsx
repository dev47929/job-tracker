import Sidebar from "./Sidebar";
import Table from "./Table";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            My Dashboard
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            JobStack
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-500">Total Applications</h2>
            <p className="text-2xl font-bold text-gray-800 mt-2">24</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-500">Interviews</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">5</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-500">Offers</h2>
            <p className="text-2xl font-bold text-green-600 mt-2">2</p>
          </div>

        </div>

        {/* Table Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Recent Applications
          </h2>
          <Table />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;