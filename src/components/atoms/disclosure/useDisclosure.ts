import { useContext } from "react";
import {
  DisclosureContext,
} from "./disclosureContext";

export function useDisclosure() {
  const state = useContext(DisclosureContext);

  if (!state) {
    throw new Error("useDisclosure must be used within a DisclosureProvider");
  }

  return state;
}
