import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import HomePage from "./components/HomePage.js"
import LoginPage from "./components/LoginPage.js";
import ProfilePage from "./components/ProfilePage.js";

import { AuthContext, AuthProvider } from "../context/AuthContext.js";
import { Toaster } from "react-hot-toast";

//Background Image
import bgImage from "url:./assets/bgImage.svg";
import { ChatProvider } from "../context/ChatContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

//Routing Configuration
const routerConfig = createBrowserRouter([
    {
        path : "/",
        element : <HomePage/>,
        errorElement : "Invalid URL"
    },
    {
        path : "/login",
        element : <LoginPage />
    },
    {
        path : "/profile",
        element : <ProfilePage />
    }
]);

//Parent Component
const App = () => {

    return(
        <div style={ {backgroundImage: `url(${bgImage})`} } className="bg-cover bg-center">
            <Toaster />
            <RouterProvider router={routerConfig} />
        </div>
    );

}

root.render(<AuthProvider><ChatProvider><App /></ChatProvider></AuthProvider>);