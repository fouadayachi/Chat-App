import ChatContainer from "../components/ChatContainer";
import NoChat from "../components/NoChat";
import SideBar from "../components/SideBar"
import { useChatStore } from "../store/useChatStore"


const HomePage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex rounded-lg h-full overflow-hidden">
            <SideBar />
            {selectedUser ? <ChatContainer /> : <NoChat />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage