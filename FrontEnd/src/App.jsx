/* eslint-disable no-unused-vars */
import { Loader } from 'lucide-react';
import React, { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(onlineUsers);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ?  <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ?  <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;