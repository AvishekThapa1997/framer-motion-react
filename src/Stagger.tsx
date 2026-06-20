import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import { useState } from "react";

export default function Stagger() {
  return (
    <div className="h-dvh w-dvw bg-black p-4">
      <Sidebar />
    </div>
  );
}

function Sidebar() {
  const [open, setOpen] = useState(false);
  const sidebarContentVariants: Variants = {
    open: {
      clipPath: "circle(2000px at 50px 50px)",
    },
    close: {
      clipPath: "circle(0 at 50px 50px)",
    },
  };

  const listVariants: Variants = {
    open: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.05),
      },
    },
    close: {
      opacity: 0,
      transition: {
        delayChildren: stagger(0.05, { from: "last" }),
        when: "afterChildren",
      },
    },
  };

  const listItemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
    },
    close: {
      opacity: 0,
      y: 200,
    },
  };
  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed left-4 top-4 cursor-pointer z-50 flex size-18 items-center justify-center rounded-full bg-stone-900 text-white"
      >
        {open ? <X size={40} /> : <Menu size={40} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={sidebarContentVariants}
            initial="close"
            animate="open"
            exit="close"
            transition={{
              duration: 0.5,
            }}
            className="fixed inset-0 w-150 z-40 bg-stone-900"
          >
            <motion.ul
              variants={listVariants}
              className="mt-25 text-2xl text-white space-y-10 p-2"
            >
              {[1, 2, 3, 4].map((item) => {
                return (
                  <motion.li
                    variants={listItemVariants}
                    transition={{
                      ease: "linear",
                    }}
                    className="p-6 text-center rounded-md bg-stone-700 "
                  >
                    {item}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
