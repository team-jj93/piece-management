export type DisclosureGroupValue = [
  index: number,
  setIndex: (value: number | ((prev: number) => number)) => void
];
