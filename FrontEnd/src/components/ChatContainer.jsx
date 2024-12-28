import moment from "moment";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessagesSkeleton";

const ChatContainer = () => {
  const {
    selectedUser,
    getMessages,
    isMessagesLoading,
    messages,
    messageListener,
    messageUnListener,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
    messageListener();
    () => {
      messageUnListener();
    };
  }, [getMessages, selectedUser, messageListener, messageUnListener]);
  useEffect(() => {
    if (messageRef.current && messages) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);
  if (isMessagesLoading)
    return (
      <div className="w-full overflow-auto flex-1">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );
  return (
    <div className="w-full flex flex-col overflow-auto flex-1 ">
      <ChatHeader />
      <div className="w-full flex flex-1 flex-col p-4 overflow-y-auto gap-5">
        {messages.map((message) => (
          <div
            className={`chat ${
              message.senderId === selectedUser._id ? "chat-end " : "chat-start"
            }`}
            key={message._id}
            ref={messageRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === selectedUser._id
                      ? selectedUser.profilePic || "/avatar.png"
                      : authUser.profilePic || "/avatar.png"
                  }
                  alt="profile_img"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {moment(message.createdAt).format("HH:mm")}
              </time>
            </div>
            <div className="chat-bubble flex flex-col gap-1">
              {message.image && (
                <img
                  src={message.image}
                  alt="img"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              <span>{message.text}</span>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
