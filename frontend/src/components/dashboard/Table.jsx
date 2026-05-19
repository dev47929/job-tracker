import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

const Table = () => {
  const [userJobs, setUserJobs] = useState([]);
  const auth = "Bearer " + localStorage.getItem("token");
  const url = `${BASE_URL}/jobs/users/getjobs`;
  const delurl = `${BASE_URL}/jobs/users/`;

  async function loadJobs() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      if (Array.isArray(data)) {
        setUserJobs(data);
      }
    } catch (e) {
      console.log("Error ", e);
    }
  }

  async function deleteJob(jobId) {
    console.log("Delete Triggered");
    try {
      const response = await fetch(delurl + jobId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        }
      });
      if (response.ok) {
        // Reload jobs after successful deletion
        loadJobs();
      }
    } catch (e) {
      console.log("Delete error ", e);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []); // Fixed infinite loop dependency array

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Applied On</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Comments</th>
              <th className="py-3 px-4 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userJobs.map((job, i) => (
              <tr key={job.jobId || i} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                <th className="py-4 px-4 font-normal text-slate-500">{i + 1}</th>
                <td className="py-4 px-4 font-semibold text-white">{job.company}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    job.status === "Offer" || job.status === "Accepted" ? "bg-green-500/10 text-green-400" :
                    job.status === "Interview" ? "bg-blue-500/10 text-blue-400" :
                    job.status === "Rejected" ? "bg-red-500/10 text-red-400" :
                    "bg-gray-500/10 text-gray-400"
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-slate-400">{job.appliedOn}</td>
                <td className="py-4 px-4 text-slate-300">{job.role}</td>
                <td className="py-4 px-4 text-slate-400 max-w-xs truncate">{job.comments}</td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => deleteJob(job.jobId)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition"
                    aria-label="Delete application"
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {userJobs.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  No job applications found. Click "+ Add with AI" to add some!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
