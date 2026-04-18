import { useState } from "react";
import { Link } from "react-router-dom";


export default function AuthLogin() {
    

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [login , isLoggedIn] = useState(false);
    const url = "http://localhost:8080/auth/login";

    async function tryLogin(){
    const response = await fetch(url, {
      method: "POST",
      headers: {
  "Content-Type": "application/json"
},
       body: JSON.stringify({
      username : username,
      password : password
    })
,
    });
    return response;
    }

    async function handleSubmit(e){
      e.preventDefault();
      const res = await tryLogin();
      const data = await res.json();
      if(res.ok){
        console.log("Authentication Successfull");
        localStorage.setItem("token" , data.jwt);
        isLoggedIn(true);

      }else{
        console.log("Authentication failed");
      }
      setPassword("");
      setUsername("");
    }

    if(!login){
      return (
      <>
      <h1 className="text-3xl font-extrabold text-center mb-2 text-white">
        Welcome Back
      </h1>
      <p className="text-slate-400 text-center mb-8">
        Log in to Job<span className="text-indigo-400">Stack</span>
      </p>

      <form className="space-y-5">
        <input
        onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
          className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                     text-white focus:outline-none focus:border-indigo-500"
          
        />

        <input
        onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                     text-white focus:outline-none focus:border-indigo-500"
        />

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 
                     transition font-semibold text-white"
        >
          Login
        </button>
      </form>

      <div className="flex justify-left text-sm text-slate-400 mt-6">
        <p className="pr-1">New User?</p>
        <Link to="/auth/signup" className="hover:text-indigo-400 hover:underline transition">
        Create account
        </Link>
      </div>
    </>
  )}else{
      return (<>
      <div className="p-4 text-center text-sm text-fg-success-strong flex flex-col justify-center  rounded-base bg-success-soft" role="alert">
  <span class="font-medium">You have successfully Logged In! Proceed to Dashboard </span>

<Link
          to="/user/dashboard"
          className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 
                     transition font-semibold text-white m-3 p-3 text-center "
        >
          Proceed To Dashboard
        </Link>
        </div>
      </>)
    }
}
