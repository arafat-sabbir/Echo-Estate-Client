import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MainLayout from "../Layout/MainLayout.jsx/MainLayout";
import Home from "../Pages/Home/Home";
import Allproperties from "../Pages/AllProperties/Allproperties";
import PropertyDetail from "../Pages/PropertyDetail/PropertyDetail";
import AgentProfile from "../Pages/AgentProfile/AgentProfile";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
import Profile from "../Pages/DashBoard/Profile/Profile";
import CheckAdmin from "../Utility/Middlewares/CheakAdmin/CheckAdmin";
import ManageProperties from "../Pages/DashBoard/AdminDashBoard/ManageProperties/ManageProperties";
import ManageUsers from "../Pages/DashBoard/AdminDashBoard/ManageUser/ManageUsers";
import ManageReviews from "../Pages/DashBoard/AdminDashBoard/ManageReview/ManageReviews";
import AdvertiseProperty from "../Pages/DashBoard/AdminDashBoard/AdvertiseProperty/AdvertIseProperty";
import AgentRequest from "../Pages/DashBoard/AdminDashBoard/AgentRequest/AgentRequest";
import Wishlist from "../Pages/DashBoard/UserDashboard/Wishlist/Wishlist";
import MakePayment from "../Pages/DashBoard/UserDashboard/MakePayment/MakePayment";
import MakeAnOffer from "../Pages/DashBoard/UserDashboard/MakeAnOffer/MakeAnOffer";
import CheckAgent from "../Utility/Middlewares/CheakAgent/CheckAgent";
import PropertyBought from "../Pages/DashBoard/UserDashboard/PropertyBought/PropertyBought";
import MyReview from "../Pages/DashBoard/UserDashboard/MyReview/MyReview";
import AddProperty from "../Pages/DashBoard/AgentDashBoard/AddProperty/AddProperty";
import AddedProperties from "../Pages/DashBoard/AgentDashBoard/AddedProperties/AddedProperties";
import UpdateaddedProperties from "../Pages/UpdateAddedProperties/UpdateaddedProperties";
import SoldProperties from "../Pages/DashBoard/AgentDashBoard/SoldProperties/SoldProperties";
import RequestedProperties from "../Pages/DashBoard/AgentDashBoard/Requested Properties/RequestedProperties";

export const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        element: <MainLayout ></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "allProperties",
                element: <Allproperties></Allproperties>,
            },
            {
                path: "propertyDetail/:id",
                element: <PropertyDetail></PropertyDetail>,
                loader: ({ params }) =>
                    fetch(
                        `https://echo-state-server.vercel.app/api/detailProperty/${params.id}`
                    ),
            },
        ],
    },
    {
        path: "/agentProfile/:email",
        element: <AgentProfile></AgentProfile>,
        loader: ({ params }) =>
            fetch(
                `https://echo-state-server.vercel.app/api/getAgentData/${params.email}`
            ),
    },
    {
        path: "/signIn",
        element: <SignIn></SignIn>,
    },
    {
        path: "/signUp",
        element: <SignUp></SignUp>,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashBoard></DashBoard>
            </PrivateRoute>
        ),
        children: [
            // all user routes
            {
                path: "myProfile",
                element: <Profile></Profile>,
            },
            // admin routes
            {
                path: "manageProperties",
                element: (
                    <CheckAdmin>
                        <ManageProperties></ManageProperties>
                    </CheckAdmin>
                ),
            },
            {
                path: "manageUsers",
                element: (
                    <CheckAdmin>
                        <ManageUsers></ManageUsers>
                    </CheckAdmin>
                ),
            },
            {
                path: "manageReviews",
                element: (
                    <CheckAdmin>
                        <ManageReviews></ManageReviews>
                    </CheckAdmin>
                ),
            },
            {
                path: "adverTiseProperty",
                element: (
                    <CheckAdmin>
                        <AdvertiseProperty></AdvertiseProperty>
                    </CheckAdmin>
                ),
            },
            {
                path: "agentRequest",
                element: (
                    <CheckAdmin>
                        <AgentRequest></AgentRequest>
                    </CheckAdmin>
                ),
            },
            // user routes
            {
                path: "wishlist",
                element: <Wishlist></Wishlist>,
            },
            {
                path: "makePayment/:id",
                element: <MakePayment></MakePayment>,
            },
            {
                path: "makeAnOffer/:id",
                element: <MakeAnOffer></MakeAnOffer>,
                loader: ({ params }) =>
                    fetch(
                        `https://echo-state-server.vercel.app/api/getWish/${params.id}`
                    ),
            },
            {
                path: "propertyBought",
                element: <PropertyBought></PropertyBought>,
            },
            {
                path: "myReview",
                element: <MyReview></MyReview>,
            },
            // agent routes
            {
                path: "addedProperties",
                element: (
                    <CheckAgent>
                        <AddedProperties></AddedProperties>
                    </CheckAgent>
                ),
            },
            {
                path: "addProperty",
                element: (
                    <CheckAgent>
                        <AddProperty></AddProperty>
                    </CheckAgent>
                ),
            },
            {
                path: "updateProperty/:id",
                element: (
                    <CheckAgent>
                        <UpdateaddedProperties></UpdateaddedProperties>
                    </CheckAgent>
                ),
                loader: ({ params }) =>
                    fetch(
                        `https://echo-state-server.vercel.app/api/detailProperty/${params.id}`
                    ),
            },
            {
                path: "soldProperties",
                element: (
                    <CheckAgent>
                        <SoldProperties></SoldProperties>
                    </CheckAgent>
                ),
            },
            {
                path: "requestedProperties",
                element: (
                    <CheckAgent>
                        <RequestedProperties></RequestedProperties>
                    </CheckAgent>
                ),
            },
        ],
    },
]);
