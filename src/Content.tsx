import { type PropsWithChildren } from "react";

const Content = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-dvh p-2 flex justify-center items-center">{children}</div>
  );
};

export default Content;
