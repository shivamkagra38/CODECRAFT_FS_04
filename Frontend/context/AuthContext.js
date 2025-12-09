import { createContext, useEffect, useState } from "react";
import { backendUrl } from "../backendUrl";
import axios from "axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

export const AuthContext = createContext();
axios.defaults.baseURL = backendUrl;

export const AuthProvider = (props) => {

    const[token, setToken] = useState(localStorage.getItem("token"));
    const[authUser, setAuthUser] = useState(null);
    const[onlineUsers, setOnlineUsers] = useState([]);
    const[socket, setSocket] = useState(null);

    //Connect socket function to handle socket connection and online users updates
    const connectSocket = (userData) => {

        if(!userData || socket?.connected)
        {
            return;
        }

        const newSocket = io(backendUrl, {
            query:{
                userId: userData._id
            }
        });

        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds)=>{

            setOnlineUsers(userIds);

        });

    }

    useEffect(()=>{

        checkAuth();

    },[]);

    //Check if user if suthenticated or not
    const checkAuth = async () => {

        try 
        {
            const data =  await axios.get("/check",{
                headers:{
                    token : localStorage.getItem("token")
                }
            });
            setAuthUser(data?.data?.user);
            connectSocket(data?.data?.user);
        }
        catch(error)
        {
            console.log(error);
            toast.error("User Not Logged In !");
        }

    }

    //Login function
    const login = async (state, details) => {

        try
        {
            const data = await axios.post(`/${state}`, details);
            setAuthUser(data.data.user);
            connectSocket(data.data.user);
            localStorage.setItem("token", data.data.token);
            setToken(data.data.token); 
            state = state === "signup" ? "Sign up" : "Log in" ;   
            toast.success(`${state} Successful !`);   
        }
        catch(error)
        {
            console.log(`${state} error !`);
            toast.error(`${state} error !`);
        }

    }

    //Log out function
    const logout = async () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        toast.success("Loggoed out successfully !");
        socket.disconnect();
    }

    //Update Profile
    const updateProfile = async (body) => {

        try
        {
            const data = await axios.put("/update-profile", body,{
                headers:{token}
            });

            if(data?.data?.success)
            {
                setAuthUser(data?.data?.user);
                toast.success("Profile Updated !");
            }

        }
        catch(error)
        {
            console.log("Update profile error");
            toast.error("Error While Updating Profile");
        }

    }


    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile,
        token
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )

}