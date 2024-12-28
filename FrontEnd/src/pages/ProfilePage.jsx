import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const [selectedImage,setSelectedImage] = useState(null);
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setSelectedImage(reader.result);
      await updateProfile({ profile_pic: reader.result });
    }
  };
  return (
    <div className="h-screen bg-base-100 pt-20 ">
      <div className="flex flex-col w-full max-w-2xl mx-auto items-center gap-4 text-center">
        <div className="rounded-xl bg-base-300 w-full text-primary space-y-8 p-4 py-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Profile</h2>
            <p className="text-lg">Your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="profile_img"
                className="size-32 object-cover object-center rounded-full ring-2 ring-white"
              />
              <label
                htmlFor="avatar_upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "pointer-events-none animate-pulse" : ""
                } `}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  className="hidden"
                  id="avatar_upload"
                  accept="images/*"
                  disabled={isUpdatingProfile}
                  onChange={handleProfileChange}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera Icon to update your profile"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-4" />
                <span>Full Name</span>
              </div>
              <p className="px-4 py-2.5 bg-base border rounded-lg text-left">
                {authUser.fullName}
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-4" />
                <span>Email Address</span>
              </div>
              <p className="px-4 py-2.5 bg-base border rounded-lg text-left">
                {authUser.email}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg bg-base-300 p-4 py-8">
          <h2 className="font-medium text-lg mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
