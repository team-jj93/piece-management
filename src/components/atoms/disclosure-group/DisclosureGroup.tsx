"use client";

import {
  ComponentPropsWithoutRef,
  Fragment,
  useState,
  isValidElement,
  Children,
  cloneElement,
  ReactNode,
} from "react";
import {
  DisclosureGroupContext,
  DisclosureGroupValue,
} from "./disclosureGroupContext";
import { useDisclosureGroup } from "./useDisclosureGroup";

interface DisclosureGroupChildrenProps {
  children: ReactNode;
}

const DisclosureGroupChildren = ({
  children,
}: DisclosureGroupChildrenProps) => {
  const cloneChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    // TO-DO hook 위치 변경할 것.
    // eslint-disable-next-line
    return cloneElement(child, { groupState: useDisclosureGroup() } as {
      groupState: DisclosureGroupValue;
    });
  });

  return <Fragment>{cloneChildren}</Fragment>;
};

type DisclosureGroupComponentType = typeof Fragment | "div" | "ul";

interface DisclosureGroupProps<T extends DisclosureGroupComponentType> {
  as?: T;
}

const DisclosureGroup = <T extends DisclosureGroupComponentType = "ul">({
  as,
  children,
  ...restProps
}: DisclosureGroupProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof DisclosureGroupProps<T>>) => {
  const state = useState(-1);

  const Component = as || "ul";

  return (
    <Component {...restProps}>
      <DisclosureGroupContext.Provider value={state}>
        <DisclosureGroupChildren>{children}</DisclosureGroupChildren>
      </DisclosureGroupContext.Provider>
    </Component>
  );
};

export default DisclosureGroup;
