import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

const Table = () => {
  const [userJobs, setUserJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    company: "",
    status: "",
    appliedOn: "",
    role: "",
  });
  const auth = "Bearer " + localStorage.getItem("token");
  const url = `${BASE_URL}/jobs/users/getjobs`;
  const delurl = `${BASE_URL}/jobs/users/`;
  const patchUrl = `${BASE_URL}/jobs`;

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

  async function updateJob(jobId) {
    console.log("Update Triggered for jobId:", jobId);
    try {
      const updatePayload = {
        jobID: jobId,
      };
      
      // Only add fields that have changed/are not empty
      if (editFormData.company) updatePayload.company = editFormData.company;
      if (editFormData.status) updatePayload.status = editFormData.status;
      if (editFormData.appliedOn) updatePayload.appliedOn = editFormData.appliedOn;
      if (editFormData.role) updatePayload.role = editFormData.role;

      const response = await fetch(patchUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify(updatePayload),
      });

      if (response.ok) {
        const result = await response.text();
        console.log("Update response:", result);
        setEditingJob(null);
        loadJobs();
      } else {
        console.error("Update failed with status:", response.status);
      }
    } catch (e) {
      console.log("Update error ", e);
    }
  }

  function openEditModal(job) {
    setEditingJob(job.jobId);
    setEditFormData({
      company: job.company || "",
      status: job.status || "",
      appliedOn: job.appliedOn || "",
      role: job.role || "",
    });
  }

  function closeEditModal() {
    setEditingJob(null);
    setEditFormData({
      company: "",
      status: "",
      appliedOn: "",
      role: "",
    });
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
              <th className="py-3 px-4 text-center">Actions</th>
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
                <td className="py-4 px-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(job)}
                    className="p-2 hover:bg-blue-500/10 rounded-lg text-slate-400 hover:text-blue-400 transition"
                    aria-label="Edit application"
                  >
                    <AiOutlineEdit size={18} />
                  </button>
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

      {/* Edit Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-white mb-4">Edit Job Application</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Company</label>
                <input
                  type="text"
                  value={editFormData.company}
                  onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition"
                >
                  <option value="">Select status</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Interview_Scheduled">Interview Scheduled</option>
                  <option value="Offer">Offer</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Applied On</label>
                <input
                  type="date"
                  value={editFormData.appliedOn}
                  onChange={(e) => setEditFormData({ ...editFormData, appliedOn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Role</label>
                <input
                  type="text"
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition"
                  placeholder="Enter job role"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => updateJob(editingJob)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
              >
                Save Changes
              </button>
              <button
                onClick={closeEditModal}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
