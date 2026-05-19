import { FiLoader } from "react-icons/fi";

const RawInputForm = ({ rawData, setRawData, handleAIProcess, loading, onClose }) => {
  return (
    <div>
      <p className="text-gray-400 mb-4">
        Paste unstructured job application data (from LinkedIn, emails, etc.)
      </p>
      <textarea
        value={rawData}
        onChange={(e) => setRawData(e.target.value)}
        placeholder={`Example:\nGoogle - SDE Role - Applied on 2026-04-30 - Status: Pending - Great company!\nMicrosoft - Product Manager - Applied on 2026-04-29 - Status: Interview - Very interested`}
        className="w-full h-48 px-4 py-3 bg-slate-900 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 resize-none font-mono text-sm"
      />
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleAIProcess}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-650 disabled:opacity-50 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading && <FiLoader className="animate-spin" />}
          {loading ? "Processing..." : "Process with AI"}
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RawInputForm;
