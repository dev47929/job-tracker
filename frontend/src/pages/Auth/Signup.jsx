import { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

export default function Signup() {
  const url = `${BASE_URL}/auth/signup`;
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [username, set_username] = useState("");
  const [email, set_email] = useState("");
  const [pass, set_pass] = useState("");
  const [success, setSuccess] = useState(false);

  async function createNewUser() {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: first_name,
        lastName: last_name,
        username: username,
        email: email,
        password: pass
      }),
    });
    return response;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await createNewUser();
      if (res.ok) {
        console.log("Account successfully created");
        setSuccess(true);
        set_email("");
        set_first_name("");
        set_last_name("");
        set_pass("");
        set_username("");
      } else {
        console.log("Account Creation Failed");
        setSuccess(false);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setSuccess(false);
    }
  }

  if (!success) {
    return (
      <>
        <h1 className="text-3xl font-extrabold text-center mb-2 text-white">
          Create Account
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Join Job<span className="text-indigo-400">Stack</span> today
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
            text-white focus:outline-none focus:border-indigo-500 transition"
              value={first_name}
              onChange={(e) => set_first_name(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
            text-white focus:outline-none focus:border-indigo-500 transition"
              value={last_name}
              onChange={(e) => set_last_name(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                       text-white focus:outline-none focus:border-indigo-500 transition"
            value={username}
            onChange={(e) => set_username(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                       text-white focus:outline-none focus:border-indigo-500 transition"
            value={email}
            onChange={(e) => set_email(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                       text-white focus:outline-none focus:border-indigo-500 transition"
            value={pass}
            onChange={(e) => set_pass(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 
                       transition font-semibold text-white cursor-pointer shadow-lg shadow-indigo-500/25"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-indigo-400 hover:text-indigo-300 hover:underline transition font-semibold">
            Login
          </Link>
        </p>
      </>
    );
  } else {
    return (
      <>
        <div className="p-4 text-center text-sm text-green-400 flex flex-col justify-center rounded-xl bg-green-500/10 border border-green-500/20" role="alert">
          <span className="font-semibold mb-4">You have successfully created an account!</span>
          
          <Link
            to="/auth/login"
            className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 
                       transition font-semibold text-white text-center shadow-lg shadow-indigo-500/25"
          >
            Go to Login
          </Link>
        </div>
      </>
    );
  }
}
