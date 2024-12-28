import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "../config/axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers : [],
  isCheckingAuth: true,
  socket : null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      if (response.data.success) {
        set({ authUser: response.data.data });
        toast.success("Signup successful");
        get().connectSocket();
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.response.data.message);
    }
    set({ isSigningUp: false });
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.data.success) {
        set({ authUser: null });
        toast.success("Logged out successfully");
        get().disconnectSocket();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      if (res.data.success) {
        set({ authUser: res.data.data });
        toast.success("Logged in successfully");
        get().connectSocket();
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.response.data.message);
    }
    set({ isLoggingIn: false });
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data.updatedUser });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
    set({isUpdatingProfile : false})
  },
  connectSocket : () => {
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query : {
        userId : authUser._id
      }
    });
    socket.connect();
    socket.on("online users",(usersIds) => {
      set({onlineUsers : usersIds});
    });
    set({socket : socket});
  },
  disconnectSocket : () => {
    if(get().socket?.connected) get().socket.disconnect();
    
  },
}));
