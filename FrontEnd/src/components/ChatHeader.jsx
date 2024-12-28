import { X } from 'lucide-react';
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const {selectedUser,setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();
  return (
      <div className="w-full p-2 border-b border-base-300 flex items-center gap-3 relative">
        <div className="avatar">
          <div className="size-10 rounded-full relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>
        <div className="hidden lg:block text-left min-w-0">
          <div className="font-medium truncate w-32">
            {selectedUser.fullName}
          </div>
          <div className="text-sm text-zinc-400">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </div>
        </div>
        <button type="button"  className=" absolute top-4 right-4 " onClick={() => setSelectedUser(null)}>
            <X />
        </button>
      </div>
  );
};

export default ChatHeader;
