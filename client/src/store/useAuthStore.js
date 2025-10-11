import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { io } from "socket.io-client"

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/"

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSignUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check")

            set({authUser: res.data})

            get().connectSocket()
        }catch(error){
            console.log("Error in Auth check: ", error)
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signUp : async (data) => {
        set({isSignUp:true})
        try{

            const res = await axiosInstance.post("/auth/signup",data)
            set({ authUser: res.data})

            toast.success("Account Created successfully")

            get().connectSocket();

        }catch(error){

            toast.error(error.response.data.message)
        }finally{
            set({isSignUp:false})
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try{
            const res = await axiosInstance.post("/auth/login",data)

            set({authUser: res.data})

            toast.success("Login in successfully")

            get().connectSocket();
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try{
           await axiosInstance.post("/auth/logout")
           set({authUser: null})
           toast.success("Logged out Succesfully") 
           get().disconnectSocket()
        }catch(error){
            toast.error("Error Logging Out")
            console.log("Logout error:",error)
        }
    },

    updateProfile: async (data) => {
        try{
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser: res.data})
            toast.success("Profile Updated succesfully")
        }catch(error){
            toast.error(error.response.data.message)
        }
    },

    connectSocket: () => {
        const {authUser} = get()

        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            withCredentials: true // this ensures that cookies are sent with the connection
        })

        socket.connect()

        set({ socket })

        //listen for online users event
        socket.on("getOnlineUsers",(userIds) => {
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect()
    }
}))