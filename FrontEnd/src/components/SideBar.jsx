import { Users } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SideBarSkeleton";

const SideBar = () => {
  const { selectedUser, getUsers, setSelectedUser, isUserLoading, users } = useChatStore();
  const {onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (isUserLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="w-full p-5 border-b border-base-300 flex gap-2">
        <Users className="size-6" />
        <span className="font-medium hidden lg:block">Contacts</span>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            type="button"
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`p-3 flex items-center gap-2 w-full hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt="profile_img"
                className="size-12 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></div>
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate w-32">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
