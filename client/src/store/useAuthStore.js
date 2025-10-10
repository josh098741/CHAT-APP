import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSignUp: false,
    isLoggingIn: false,


    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
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
        }catch(error){
            toast.error("Error Logging Out")
            console.log("Logout error:",error)
        }
    }
}))