import { AnimatePresence, LayoutGroup, motion, stagger } from "motion/react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { cn } from "./cn";
import { Grid, List } from "lucide-react";
import Content from "./Content";

const items = [1, 2, 3, 4, 5, 6];

const Layout = () => {
  const [layout, setLayout] = useState<"list" | "grid">("grid");
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const layoutType = {
    "flex flex-col": layout === "list",
    "grid grid-cols-3": layout === "grid",
  };

  const handleLayoutChange = () => {
    setLayout((prev) => {
      return prev === "grid" ? "list" : "grid";
    });
  };
  useEffect(() => {
    function handleKeyEvent(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedItem(-1);
      }
    }
    document.addEventListener("keydown", handleKeyEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);
  return (
    <Content>
      <LayoutGroup>
        <div className="bg-red-900 p-4 space-y-2 shadow-sm rounded-md">
          <div className="space-y-2 w-[min(400px,96vw)]">
            <div className="text-end">
              <motion.button
                whileHover={{
                  backgroundColor: "var(--color-stone-800)",
                }}
                className="text-white cursor-pointer rounded-sm p-2"
                onClick={handleLayoutChange}
              >
                {layout === "list" ? <List size={20} /> : <Grid size={20} />}
              </motion.button>
            </div>
            <motion.div layout className={cn(layoutType, "gap-2")}>
              {items.map((item, index) => {
                return (
                  <motion.div
                    layout
                    key={item}
                    initial={false}
                    style={{
                      visibility: selectedItem === item ? "hidden" : "visible",
                    }}
                    transition={{
                      type: "spring",
                      delay: index * 0.02,
                    }}
                  >
                    <motion.button
                      layoutId={`${item}`}
                      className=" bg-stone-800 rounded-md text-white cursor-pointer outline-0 w-full text-center py-8 px-2"
                      onClick={() => setSelectedItem(item)}
                      whileHover={{
                        backgroundColor: "var(--color-stone-700)",
                      }}
                    >
                      {item}
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <AnimatePresence>
            {selectedItem > 0 ? (
              <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0"
              >
                <motion.div className="absolute opacity-30 bg-black inset-0"></motion.div>
                <motion.div
                  layout
                  layoutId={`${selectedItem}`}
                  initial={{
                    scale: 0.7,
                  }}
                  transition={{
                    type: "spring",
                  }}
                  animate={{
                    scale: 1,
                  }}
                  className="fixed rounded-md top-1/2 left-1/2 -translate-1/2 size-100 bg-red-500 text-white text-2xl flex items-center justify-center"
                >
                  {selectedItem}
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </Content>
  );
};

export default Layout;
