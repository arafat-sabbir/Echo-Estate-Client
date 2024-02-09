import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout.jsx/MainLayout";
import HomePage from "../Pages/Home/HomePage";

// All The Routes For The Application For Using On main.jsx RouterProvider
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <HomePage /> }
        ]
    }
])