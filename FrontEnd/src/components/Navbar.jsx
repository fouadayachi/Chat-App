/* eslint-disable no-unused-vars */
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="bg-base-100 border-b border-base-300 fixed top-0 left-0 w-full z-40 backdrop-blur-lg ">
      <div className="flex items-center justify-between px-4 h-16 gap-2 ">
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-all"
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Chatty</h1>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/settings" className="btn btn-sm transition-colors gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
          {authUser && (
            <>
              <Link
                to="/profile"
                className="btn btn-sm transition-colors gap-2"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button
                className="btn btn-sm transition-colors gap-2"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
