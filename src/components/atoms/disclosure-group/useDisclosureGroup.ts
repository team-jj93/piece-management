import { useContext } from "react";
import { DisclosureGroupContext } from "./disclosureGroupContext";

export function useDisclosureGroup() {
  return useContext(DisclosureGroupContext);
}