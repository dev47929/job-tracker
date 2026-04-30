import Table from "./Table";
import AddwithAI from "./AddwithAI";

const Applications = () => {
  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">My Applications</h1>
          <AddwithAI />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-400">Total Applications</h2>
            <p className="text-2xl font-bold text-white mt-2">24</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-400">Interviews</h2>
            <p className="text-2xl font-bold text-blue-400 mt-2">5</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-sm text-gray-400">Offers</h2>
            <p className="text-2xl font-bold text-green-400 mt-2">2</p>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Recent Applications
          </h2>
          <Table />
        </div>
      </div>
    </>
  );
};

export default Applications;
