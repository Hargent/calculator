import { AppContext } from ".";
import { useContext } from "react";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error("AppContext used Outside of its provider");
  return context;
};
