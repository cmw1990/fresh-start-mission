
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const WebToolsLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 container mx-auto py-12 px-4 md:px-6 max-w-7xl">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default WebToolsLayout;
