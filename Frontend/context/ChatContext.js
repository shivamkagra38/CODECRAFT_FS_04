import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { backendUrl } from "../backendUrl";
import toast from "react-hot-toast";

export const ChatContext = createContext("");

export const ChatProvider = (props) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket,axios, onlineUsers, token} = useContext(AuthContext);

    const getUsers = async () => {

        try
        {
           const data =  await axios.get(`${backendUrl}/users`,{headers:{token}});

           if(data.data.success)
           {
            setUsers(data.data.users);
            setUnseenMessages(data.data.unseenMessages);

           }
        }
        catch(error)
        {
            toast.error("Error while fetching users");
            console.log("Error while fetching users");
        }

    }

    const getMessages = async (userId) => {

        const data = await axios.get(`${backendUrl}/messages/${userId}`,{headers:{token}});

        try
        {
            if(data.data.success)
            {
                setMessages(data.data.messages);
            }
        }
        catch(error)
        {
            toast.error("Error while fetching messages");
            console.log("Error while fetching messages");
        }
    }


    //function to send messages
    const sendMessages = async (messageData) => {

        try
        {
            const data = await axios.post(`${backendUrl}/send/${selectedUser._id}`,{messageData}, {headers:{token}});
            if(data.data.success)
            {
               setMessages( (prevMessages) => {

                return [...prevMessages, data.data.newMessage]

               } ) 
            }
        }
        catch(error)
        {
            toast.error("Error while sending the message");
            console.log("Error while sending the message");
        }

    }

    //function to subscribe to messages for selected user
    const subscribeToMessages = async () => {

        if(!socket)
        {
            return;
        }

        socket.on("newMessage", async (newMessage)=>{

            if(selectedUser && newMessage.senderId === selectedUser._id)
            {
                newMessage.seen = true;
                setMessages((prev) => {
                    return [...prev, newMessage];
                });
                
                try
                {
                    await axios.put(`${backendUrl}/mark/${newMessage._id}`,{}, {headers:{token}});
                    const obj = {...unseenMessages};
                    delete obj[newMessage.senderId]
                    setUnseenMessages(obj);
                }
                catch(error)
                {
                    console.log("Error while marking message");
                }

            }
            else
            {
                setUnseenMessages( (prev)=> {

                    return {...prev, [newMessage.senderId]: prev[newMessage.senderId] ? prev[newMessage.senderId] + 1 : 1 }

                } );
            }

        });

    }

    //Unsubscribe to mesages
    const unsubscribeMessages = () => {

        if(socket)
        {
            socket.off("newMessage");
        }

    }

    useEffect(()=>{

        subscribeToMessages();
        return ()=>{
            return unsubscribeMessages();
        }

    },[socket, selectedUser])

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        setMessages,
        sendMessages,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
        getMessages
    };

    return(
    <ChatContext.Provider value={value}>
        {props.children}
    </ChatContext.Provider>
    )

}
