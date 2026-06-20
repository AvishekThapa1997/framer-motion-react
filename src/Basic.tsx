import { motion } from "motion/react";
import Content from "./Content";
const Basic = () => {
  return (
    <Content>
      <motion.div
        animate={{
          x: [100, 0, -100],
          y: [-100, 0, -100],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="size-20 bg-red-500 rounded-md"
        exit={{
          scale: 0,
        }}
      />
    </Content>
  );
};

export default Basic;
