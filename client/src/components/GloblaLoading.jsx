// components/GlobalLoading.jsx
import React from "react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default GlobalLoading;
