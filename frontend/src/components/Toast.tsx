import React, { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  duration?: number; // Duration for how long the toast will be visible (in ms)
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [duration]);

  return (
    show && (
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
        {message}
      </div>
    )
  );
};

export default Toast;
