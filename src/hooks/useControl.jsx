import { useContext } from "react";
import { ControlContext } from "../context/ControlContext";

export const useControl = () => {
  const context = useContext(ControlContext);

  if (context === undefined) {
    throw new Error("use the context within the ConnectContext");
  }

  return context;
};
