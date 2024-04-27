"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


export default function ToastProvider() {

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
    />
  );
}