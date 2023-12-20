import { useContext } from "react";
import { DropContext } from "../utils/DropContext";

export function useDropGetId() {
  const id = useContext(DropContext);

  if (!id) {
    throw new Error("useDropGetId must be used within a DropProvider");
  }

  return id;
}