import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { FaWhatsapp } from "react-icons/fa";

const Root = () => {
  return (
  <div className="bg-col">
      <Navbar></Navbar>

      <div className="mx-auto w-full px-4  lg:px-8">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
            <div className="fixed bottom-10 right-8">
        <button className="btn w-14 h-14 text-xs bg-green-500 hover:bg-[#FAF7F2] hover:text-green-400 hover:border-0 text-white rounded-full border border-green-500">
          <div className="text-3xl">
            <a href="https://api.whatsapp.com/send?phone=8801755555555&text=Hello%20there!" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp></FaWhatsapp>
            </a>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Root;
