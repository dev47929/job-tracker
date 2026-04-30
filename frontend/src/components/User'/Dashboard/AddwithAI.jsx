import { useState } from "react";
import { FiX, FiLoader } from "react-icons/fi";

const AddwithAI = () => {
  const [showModal, setShowModal] = useState(false);
  const [rawData, setRawData] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedJobs, setParsedJobs] = useState([]);
  const [step, setStep] = useState(1); // 1: input, 2: review, 3: submit
  const auth = "Bearer " + localStorage.getItem("token");

  const handleAIProcess = async () => {
    if (!rawData.trim()) {
      alert("Please paste job application data");
      return;
    }

    setLoading(true);
    try {
      // Send to backend AI to parse and structure
      const response = await fetch("http://localhost:8080/jobs/parse-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify({ rawData: rawData }),
      });

      const data = await response.json();
      if (response.ok) {
        setParsedJobs(data); // Expecting array of job objects
        setStep(2); // Move to review step
      } else {
        alert("Error parsing data: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error("Error parsing data:", error);
    }
    setLoading(false);
  };

  const handleEditJob = (index, field, value) => {
    const updated = [...parsedJobs];
    updated[index][field] = value;
    setParsedJobs(updated);
  };

  const handleRemoveJob = (index) => {
    setParsedJobs(parsedJobs.filter((_, i) => i !== index));
  };

  const handleSubmitBulk = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/jobs/bulk-add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify({ jobs: parsedJobs }),
      });

      if (response.ok) {
        alert("Successfully added " + parsedJobs.length + " job applications!");
        setShowModal(false);
        setStep(1);
        setRawData("");
        setParsedJobs([]);
        // Refresh parent component if needed
        window.location.reload();
      } else {
        const data = await response.json();
        alert("Error: " + (data.message || "Failed to submit jobs"));
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error("Error submitting jobs:", error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setStep(1);
    setRawData("");
    setParsedJobs([]);
  };

  return (
    <>
      {/* Add with AI Button */}
      {!showModal && (
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition"
        >
          + Add with AI
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {step === 1 && "Add Applications with AI"}
                {step === 2 && "Review Parsed Data"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  handleReset();
                }}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Step 1: Input */}
            {step === 1 && (
              <div>
                <p className="text-gray-400 mb-4">
                  Paste unstructured job application data (from LinkedIn,
                  emails, etc.)
                </p>
                <textarea
                  value={rawData}
                  onChange={(e) => setRawData(e.target.value)}
                  placeholder="Example:
Google - SDE Role - Applied on 2026-04-30 - Status: Pending - Great company!
Microsoft - Product Manager - Applied on 2026-04-29 - Status: Interview - Very interested"
                  className="w-full h-48 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAIProcess}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    {loading && <FiLoader className="animate-spin" />}
                    {loading ? "Processing..." : "Process with AI"}
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleReset();
                    }}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div>
                <p className="text-gray-400 mb-4">
                  Review and edit the parsed job applications below
                </p>
                <div className="space-y-4 mb-6">
                  {parsedJobs.map((job, index) => (
                    <div
                      key={index}
                      className="bg-slate-700 p-4 rounded-lg border border-slate-600"
                    >
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="text-sm text-gray-400">
                            Company
                          </label>
                          <input
                            type="text"
                            value={job.company || ""}
                            onChange={(e) =>
                              handleEditJob(index, "company", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-slate-600 text-white rounded border border-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Role</label>
                          <input
                            type="text"
                            value={job.role || ""}
                            onChange={(e) =>
                              handleEditJob(index, "role", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-slate-600 text-white rounded border border-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">
                            Applied On
                          </label>
                          <input
                            type="date"
                            value={job.appliedOn || ""}
                            onChange={(e) =>
                              handleEditJob(index, "appliedOn", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-slate-600 text-white rounded border border-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">
                            Status
                          </label>
                          <select
                            value={job.status || "Applied"}
                            onChange={(e) =>
                              handleEditJob(index, "status", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-slate-600 text-white rounded border border-slate-500 focus:outline-none focus:border-indigo-500"
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
                        <label className="text-sm text-gray-400">
                          Comments
                        </label>
                        <textarea
                          value={job.comments || ""}
                          onChange={(e) =>
                            handleEditJob(index, "comments", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-slate-600 text-white rounded border border-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                          rows="2"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveJob(index)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {parsedJobs.length === 0 && (
                  <p className="text-gray-400 text-center py-8">
                    No jobs parsed. Please try again.
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitBulk}
                    disabled={loading || parsedJobs.length === 0}
                    className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    {loading && <FiLoader className="animate-spin" />}
                    {loading ? "Submitting..." : "Submit All"}
                  </button>
                  <button
                    onClick={() => handleReset()}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleReset();
                    }}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddwithAI;
