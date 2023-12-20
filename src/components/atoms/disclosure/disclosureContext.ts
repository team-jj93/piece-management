import { createContext } from "react";

export type DisclosureValue = [
  open: boolean,
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void,
  index?: number
];

export const DisclosureContext = createContext<DisclosureValue | null>(null);
