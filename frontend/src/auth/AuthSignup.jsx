import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
export default function AuthSignup() {
  const url = "http://localhost:8080/auth/signup";
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [username, set_username] = useState("");
  const [email, set_email] = useState("");
  const [pass, set_pass] = useState("");

  async function createNewUser() {
     const response = await fetch(url, {
      method: "POST",
      headers: {
  "Content-Type": "application/json"
},
       body: JSON.stringify({
      firstName : first_name,
      lastName : last_name,
      username : username,
      email : email,
      password : pass
    })
      ,
    });
    return response;
  }
  const [success , setSuccess] = useState(false);

  async function handleSubmit (e) {
    e.preventDefault();
    console.log(first_name);
    console.log(last_name);
    console.log(username);
    console.log(email);
    const res = await createNewUser();
    console.log(res);

     if(res.ok){
      console.log("Account successfully created");
      setTimeout(2000);
      setSuccess(true);
      
      set_email("");
      set_first_name("");
      set_last_name("");
      set_pass("");
      set_username("");
     }else{
      console.log("Account Creation Failed");
      setTimeout(2000);
      setSuccess(false);
     }
     
  };
  if(!success){
return (
    <>
    
      <h1 className="text-3xl font-extrabold text-center mb-2 text-white">
        Create Account
      </h1>
      <p className="text-slate-400 text-center mb-8">
        Join Job<span className="text-indigo-400">Stack</span> today
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-2 mr-3 py-3 rounded-lg bg-slate-950 border border-slate-800 
          text-white focus:outline-none focus:border-indigo-500"
            value={first_name}
            onChange={(e) => set_first_name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
          text-white focus:outline-none focus:border-indigo-500"
            value={last_name}
            onChange={(e) => set_last_name(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                     text-white focus:outline-none focus:border-indigo-500"
          value={username}
          onChange={(e) => set_username(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                     text-white focus:outline-none focus:border-indigo-500"
          value={email}
          onChange={(e) => set_email(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 
                     text-white focus:outline-none focus:border-indigo-500"
          value={pass}
          onChange={(e) => set_pass(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 
                     transition font-semibold text-white"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-slate-400 text-center mt-6">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-indigo-400 hover:underline">
          Login
        </Link>
      </p>
</>
  )}else{
    return(<>
      <div className="p-4 text-center text-sm text-fg-success-strong flex flex-col justify-center  rounded-base bg-success-soft" role="alert">
  <span class="font-medium">You have successfully created an account! </span> Proceed to Login

<Link
          to="/login"
          className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 
                     transition font-semibold text-white m-3 p-3 text-center "
        >
          Login
        </Link>
        </div>
      </>)
  }
  

  ;
}
