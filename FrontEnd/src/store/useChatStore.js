import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../config/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.users });
    } catch (error) {
      toast.error(error.response.data.message);
    }
    set({ isUserLoading: false });
  },
  getMessages: async (id) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response.data.message);
    }
    set({ isMessagesLoading: false });
  },
  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });
  },
  sendMessage: async (message) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        message
      );
      set({ messages: [...messages, res.data.message] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  messageListener: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (message) => {
      if (selectedUser._id !== message.senderId) return;
      set({ messages: [...get().messages, message] });
    });
  },
  messageUnListener: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
