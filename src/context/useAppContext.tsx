//useAppContext.tsx
import { useContext } from "react";
import { AppContext } from "./Appcontext";

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within provider");
  }
  return context;
}
