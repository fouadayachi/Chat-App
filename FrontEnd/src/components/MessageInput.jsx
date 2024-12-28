import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith('image/')){
      toast.error("Please an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    }
    reader.readAsDataURL(file);
  };
  const handleImageRemove = () => {
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;
    try {
      await sendMessage({text : text.trim(), image : image});
      setText("");
      setImage(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4 w-full">
      {image && (
        <div className="relative mb-3 w-fit">
          <img
            src={image}
            alt="image"
            className="size-20 object-cover rounded-lg border border-zinc-700"
          />
          <button
            onClick={handleImageRemove}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
            type="button"
          >
            <X className="size-3" />
          </button>
        </div>
      )}
      <form className="flex items-center gap-2 w-full " onSubmit={handleSendMessage}>
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input input-bordered w-full rounded-lg input-sm sm:input-md "
            placeholder="Type a message..."
          />
          <input
            type="file"
            accept="images/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileRef}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${image ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !image}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
