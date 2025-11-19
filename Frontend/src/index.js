import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import HomePage from "./components/HomePage.js"
import LoginPage from "./components/LoginPage.js";
import ProfilePage from "./components/ProfilePage.js";

//Background Image
import bgImage from "url:./assets/bgImage.svg";

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
            <RouterProvider router={routerConfig} />
        </div>
    );

}

root.render(<App />);