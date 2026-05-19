import { useState } from "react";
import { FiX } from "react-icons/fi";
import RawInputForm from "./AddwithAI/RawInputForm";
import ReviewParsedJobs from "./AddwithAI/ReviewParsedJobs";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AddwithAI = () => {
  const [showModal, setShowModal] = useState(false);
  const [rawData, setRawData] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedJobs, setParsedJobs] = useState([]);
  const [step, setStep] = useState(1); // 1: input, 2: review
  const auth = "Bearer " + localStorage.getItem("token");

  const handleAIProcess = async () => {
    if (!rawData.trim()) {
      alert("Please paste job application data");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/jobs/users/ai/addGroq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify({ rawData: rawData }),
      });
      console.log("Successfully fetched ")
      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      
      if (response.ok) {
        setParsedJobs(data);
        setStep(2);
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
      const response = await fetch(`${BASE_URL}/jobs/bulk-add`, {
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
        window.location.reload();
      } else {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
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

  const handleClose = () => {
    setShowModal(false);
    handleReset();
  };

  return (
    <>
      {/* Add with AI Button */}
      {!showModal && (
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition cursor-pointer"
        >
          + Add with AI
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {step === 1 && "Add Applications with AI"}
                {step === 2 && "Review Parsed Data"}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Step 1: Input */}
            {step === 1 && (
              <RawInputForm
                rawData={rawData}
                setRawData={setRawData}
                handleAIProcess={handleAIProcess}
                loading={loading}
                onClose={handleClose}
              />
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <ReviewParsedJobs
                parsedJobs={parsedJobs}
                handleEditJob={handleEditJob}
                handleRemoveJob={handleRemoveJob}
                handleSubmitBulk={handleSubmitBulk}
                handleReset={handleReset}
                onClose={handleClose}
                loading={loading}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddwithAI;
