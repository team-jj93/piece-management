import { createContext } from "react";

export type DisclosureGroupValue = [
  index: number,
  setIndex: (value: number | ((prev: number) => number)) => void
];

export const DisclosureGroupContext =
  createContext<DisclosureGroupValue | null>(null);