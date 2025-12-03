import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-base-200">
      {/* Logo Animation */}
      <motion.div
        className="p-6 rounded-full"
        animate={{
          boxShadow: [
            "0 0 15px rgba(0,150,255,0.3)",
            "0 0 35px rgba(0,150,255,0.6)",
            "0 0 15px rgba(0,150,255,0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.img
          src="/logo.png"
          alt="Logo"
          className="w-24 h-24"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </motion.div>

      {/* Pulsing text */}
      <motion.p
        className="text-xl font-semibold text-primary"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;
