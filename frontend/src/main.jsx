import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, Route, RouterProvider } from "react-router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AuthLogin from "./auth/AuthLogin.jsx";
import AuthSignup from "./auth/AuthSignup.jsx";
import Auth from "./auth/Auth.jsx";
import Dashboard from "./components/User'/Dashboard/Dashboard.jsx";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/auth",
    element: <Auth />,
    children: [
      { path: "login", element: <AuthLogin /> },
      { path: "signup", element: <AuthSignup /> },
    ],
  },
  {
    path: "/user/dashboard",
    element: <Dashboard/> ,
    children: [
      { path: "login", element: <AuthLogin /> },
      { path: "signup", element: <AuthSignup /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Routes}></RouterProvider>
  </StrictMode>,
);
