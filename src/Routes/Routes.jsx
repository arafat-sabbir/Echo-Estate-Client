import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout.jsx/MainLayout";
import HomePage from "../Pages/Home/HomePage";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <HomePage /> }
        ]
    }
])