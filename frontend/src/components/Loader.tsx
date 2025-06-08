import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

function Loader() {
    return <div className="text-[#0EA5E9] flex justify-center items-center gap-4 h-screen w-full bg-white">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-l-2 border-[#0EA5E9]"></div>
        <p className="text-3xl font-semibold animate-pulse">Loading.
          <motion.span
          variants={fadeIn('down' , 0.05)}
          initial='hidden'
          whileInView={"show"}
          viewport={{once: true}}
          >.</motion.span>
          <motion.span
          variants={fadeIn('down' , 0.1)}
          initial='hidden'
          whileInView={"show"}
          viewport={{once: true}}
          >.</motion.span>
          <motion.span
          variants={fadeIn('down' , 0.15)}
          initial='hidden'
          whileInView={"show"}
          viewport={{once: true}}
          >.</motion.span>
          <motion.span
          variants={fadeIn('down' , 0.2)}
          initial='hidden'
          whileInView={"show"}
          viewport={{once: true}}
          >.</motion.span>
          <motion.span
          variants={fadeIn('down' , 0.25)}
          initial='hidden'
          whileInView={"show"}
          viewport={{once: true}}
          >.</motion.span>
          <motion.span
          variants={fadeIn('down' , 0.3)}
          initial='hidden'
          whileInView={"show"}
          viewport={{once: true}}
          >.</motion.span>
        </p>
  </div>
  
}


export default Loader;