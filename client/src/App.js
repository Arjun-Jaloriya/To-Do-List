import React from "react";
import "./App.css";
import Tasks from "./Components/Tasks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/EditTask";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Tasks />,
    },
    {
      path: "/create",
      element: <AddTask />,
    },
    {
      path: "/update/:id",
      element: <EditTask />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
