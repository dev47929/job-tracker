import Table from "../../components/dashboard/Table";
import AddwithAI from "../../components/dashboard/AddwithAI";

const Applications = () => {
  return (
    <>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">My Applications</h1>
          <AddwithAI />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-sm font-semibold text-slate-400">Total Applications</h2>
            <p className="text-3xl font-extrabold text-white mt-2">24</p>
          </div>

          <div className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-sm font-semibold text-slate-400">Interviews Scheduled</h2>
            <p className="text-3xl font-extrabold text-indigo-400 mt-2">5</p>
          </div>

          <div className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-sm font-semibold text-slate-400">Offers Received</h2>
            <p className="text-3xl font-extrabold text-green-400 mt-2">2</p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700/50 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-white">
            Recent Applications
          </h2>
          <Table />
        </div>
      </div>
    </>
  );
};

export default Applications;
