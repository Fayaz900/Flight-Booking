import { motion } from "framer-motion";
import Logo from "../assets/favicon.png";

const navbarVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 12 } },
};
const logoVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const Navbar = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={navbarVariants}
    className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 m-2"
  >
    <div className="flex gap-3 sm:gap-6 text-sm sm:text-base font-semibold">
      {["Home", "My Booking", "Register", "Login", "Contact"].map((item) => (
        <a key={item} href="#" className="hover:text-yellow-300 transition">{item}</a>
      ))}
    </div>

    <motion.div variants={logoVariants} className="flex justify-center items-center text-3xl font-bold gap-4 cursor-pointer">
      <img src={Logo} alt="Logo" className="w-[50px]" /> AEROLINK
    </motion.div>

    <div className="flex items-center gap-3 sm:gap-4">
      <button className="border border-white px-3 py-1 rounded-full font-bold hover:bg-white hover:text-cyan-600 transition">
        SEARCH
      </button>
      <button className="border border-white px-3 py-1 rounded-full font-bold hover:bg-white hover:text-cyan-600 transition flex items-center gap-2 relative">
        <span>My Trips</span>
        <span className="ml-1 border border-white px-2 py-0.5 rounded-full text-xs bg-white text-cyan-600">0</span>
      </button>
    </div>
  </motion.div>
);
