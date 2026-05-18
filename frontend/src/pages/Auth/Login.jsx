import { useState } from "react";
import { Link } from "react-router-dom";
import Error from "../../components/ui/Error";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, isLoggedIn] = useState(false);
  const [err, setErr] = useState("");
  const url = `${BASE_URL}/auth/login`;

  async function tryLogin() {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return response;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await tryLogin();
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.jwt);
        isLoggedIn(true);
      } else {
        setErr(data.message || "Login failed. Please try again.");
        setTimeout(() => {
          setErr("");
        }, 3000);
      }
    } catch (error) {
      setErr("An error occurred. Please try again.");
      setTimeout(() => {
        setErr("");
      }, 3000);
      console.error("Login error:", error);
    }
    setPassword("");
    setUsername("");
  }

  if (!login) {
    return (
      <>
        <h1 className="text-3xl font-extrabold text-center mb-2 text-white">
          Welcome Back
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Log in to Job<span className="text-indigo-400">Stack</span>
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                     text-white focus:outline-none focus:border-indigo-500 transition"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                     text-white focus:outline-none focus:border-indigo-500 transition"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 
                     transition font-semibold text-white cursor-pointer shadow-lg shadow-indigo-500/25"
          >
            Login
          </button>
        </form>

        <div className="flex justify-left text-sm text-slate-450 mt-6 gap-1">
          <p>New User?</p>
          <Link
            to="/auth/signup"
            className="text-indigo-400 hover:text-indigo-300 hover:underline transition font-medium"
          >
            Create account
          </Link>
        </div>

        <div className="mt-4">
          <Error err={err} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="p-4 text-center text-sm text-green-400 flex flex-col justify-center rounded-xl bg-green-500/10 border border-green-500/20"
          role="alert"
        >
          <span className="font-medium mb-4">
            You have successfully Logged In!
          </span>

          <Link
            to="/user/dashboard/applications"
            className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 
                     transition font-semibold text-white text-center shadow-lg shadow-indigo-500/25"
          >
            Proceed To Dashboard
          </Link>
        </div>
      </>
    );
  }
}
