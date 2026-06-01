import { useState } from "react";

function MatchJobs() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file) return setError("Please upload a resume PDF.");
    if (!content.trim()) return setError("Please paste a job description.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // The API expects a JSON body with `content`. The backend example sends
      // a JSON blob appended to form-data (named `message`). We follow that.
      const blob = new Blob([JSON.stringify({ content })], { type: "application/json" });
      formData.append("message", blob);

      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/ai/matchjobs`, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Match Jobs</h1>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Upload resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-slate-300"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">Job description</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder="Paste the job description here..."
            className="w-full resize-y rounded-md border border-slate-600 bg-slate-700 p-3 text-sm text-slate-100 placeholder-slate-400"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-60 hover:bg-indigo-700"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setContent("");
              setResult(null);
              setError("");
            }}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Analysis</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Match percentage</p>
              <p className="mt-2 text-3xl font-bold text-white">{result.matchPercentage ?? "—"}%</p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Summary</p>
              <p className="mt-2 text-sm text-slate-200">{result.summary ?? "No summary returned."}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Strengths</p>
              <ul className="mt-2 list-disc pl-4 text-sm text-slate-200">
                {(result.strengths || []).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Missing skills</p>
              <ul className="mt-2 list-disc pl-4 text-sm text-slate-200">
                {(result.missingSkills || []).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Recommendations</p>
              <ul className="mt-2 list-disc pl-4 text-sm text-slate-200">
                {(result.recommendations || []).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {result.relevantSkills && result.relevantSkills.length > 0 && (
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Relevant skills</p>
              <p className="mt-2 text-sm text-slate-200">{result.relevantSkills.join(", ")}</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default MatchJobs;
