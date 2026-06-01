import { useState } from "react";
import { FiLoader } from "react-icons/fi";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

const ReviewParsedJobs = ({
  parsedJobs,
  handleEditJob,
  handleRemoveJob,
  handleSubmitBulk,
  handleReset,
  onClose,
  loading,
}) => {
  const [addStatuses, setAddStatuses] = useState({});

  async function addSingleJob(index) {
    const job = parsedJobs[index];
    if (!job) return;
    setAddStatuses((prev) => ({ ...prev, [index]: "posting" }));
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/jobs/users/addjob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          company: job.company || "",
          status: job.status || "Applied",
          appliedOn: job.appliedOn || "",
          role: job.role || "",
        }),
      });

      if (res.ok) {
        await res.json();
        setAddStatuses((prev) => ({ ...prev, [index]: "success" }));
        // remove the job from parsed list after successful add
        handleRemoveJob(index);
      } else {
        const text = await res.text();
        console.error("Add failed", res.status, text);
        setAddStatuses((prev) => ({ ...prev, [index]: "error" }));
      }
    } catch (e) {
      console.error("Add error", e);
      setAddStatuses((prev) => ({ ...prev, [index]: "error" }));
    }
  }

  return (
    <div>
      <p className="text-gray-400 mb-4 font-medium text-sm">
        Review and edit the parsed job applications below before submitting.
      </p>
      <div className="space-y-4 mb-6">
        {parsedJobs.map((job, index) => (
          <div
            key={index}
            className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-md hover:border-slate-750 transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-xs font-semibold text-slate-450 block mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={job.company || ""}
                  onChange={(e) =>
                    handleEditJob(index, "company", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-slate-800 text-white rounded border border-slate-750 focus:outline-none focus:border-indigo-500 font-medium text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-450 block mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={job.role || ""}
                  onChange={(e) =>
                    handleEditJob(index, "role", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-slate-800 text-white rounded border border-slate-750 focus:outline-none focus:border-indigo-500 font-medium text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-450 block mb-1">
                  Applied On
                </label>
                <input
                  type="date"
                  value={job.appliedOn || ""}
                  onChange={(e) =>
                    handleEditJob(index, "appliedOn", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-slate-800 text-white rounded border border-slate-750 focus:outline-none focus:border-indigo-500 font-medium text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-450 block mb-1">
                  Status
                </label>
                <select
                  value={job.status || "Applied"}
                  onChange={(e) =>
                    handleEditJob(index, "status", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-slate-800 text-white rounded border border-slate-750 focus:outline-none focus:border-indigo-500 font-medium text-sm"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                  <option>Offer</option>
                  <option>Accepted</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs font-semibold text-slate-450 block mb-1">
                Comments
              </label>
              <textarea
                value={job.comments || ""}
                onChange={(e) =>
                  handleEditJob(index, "comments", e.target.value)
                }
                className="w-full px-3 py-2 bg-slate-800 text-white rounded border border-slate-750 focus:outline-none focus:border-indigo-500 resize-none font-medium text-sm"
                rows="2"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => addSingleJob(index)}
                disabled={addStatuses[index] === "posting"}
                className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500 hover:text-white text-green-400 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-2"
              >
                {addStatuses[index] === "posting" && <FiLoader className="animate-spin" />}
                {addStatuses[index] === "success" ? "Added" : addStatuses[index] === "error" ? "Retry" : "Add Application"}
              </button>
              <button
                onClick={() => handleRemoveJob(index)}
                className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Remove Application
              </button>
            </div>
          </div>
        ))}
      </div>

      {parsedJobs.length === 0 && (
        <p className="text-slate-450 text-center py-8">
          No job applications parsed. Try pasting data again.
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSubmitBulk}
          disabled={loading || parsedJobs.length === 0}
          className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-green-500/25"
        >
          {loading && <FiLoader className="animate-spin" />}
          {loading ? "Submitting..." : "Submit All"}
        </button>
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2 bg-gray-650 hover:bg-gray-700 text-white rounded-lg font-semibold transition cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-gray-750 hover:bg-gray-800 text-white rounded-lg font-semibold transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewParsedJobs;
