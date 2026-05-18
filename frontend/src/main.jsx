import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import AuthLayout from "./pages/Auth/AuthLayout.jsx";
import DashboardLayout from "./pages/Dashboard/DashboardLayout.jsx";
import Profile from "./pages/Dashboard/Profile.jsx";
import Applications from "./pages/Dashboard/Applications.jsx";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/user/dashboard/",
    element: <DashboardLayout />,
    children: [
      { path: "profile", element: <Profile /> },
      { path: "applications", element: <Applications /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Routes}></RouterProvider>
  </StrictMode>,
);

