// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DataChart from "./Components/DataChart";
import Root from "./Layouts/Root";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import { store } from "./Services/store"; // Change from default to named import
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
import AuthRouter from "./Utils/AuthRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        element: <AuthRouter />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "data/:id",
            element: <DataChart />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
