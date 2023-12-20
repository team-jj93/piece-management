import {
  ElementType,
  HTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  useState,
  MouseEvent,
  ComponentPropsWithoutRef,
  useEffect,
  CSSProperties,
} from "react";

import { useDisclosure } from "./useDisclosure";
import { DisclosureContext } from "./disclosureContext";

type PanelProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "className" | "style" | "children"
> & {
  disableDefaultClass?: boolean;
  children:
    | ReactNode
    | ((props: { open: boolean; close: () => void }) => ReactNode);
  className?: string | ((open: boolean) => string);
  style?: CSSProperties | ((open: boolean) => CSSProperties);
};

const Panel = ({
  className,
  style,
  disableDefaultClass = false,
  children,
  ...restProps
}: PanelProps) => {
  const [open, setOpen] = useDisclosure();

  const close = () => {
    setOpen(false);
  };

  const appliedClassName =
    typeof className === "function" ? className(open) : className;
  const appliedStyle = typeof style === "function" ? style(open) : style;

  const panelClassName = `${appliedClassName || ""} ${
    !open && !disableDefaultClass
      ? "hidden overflow-hidden h-0 p-0 m-0 transition-all duration-300 ease-in-out"
      : ""
  }`;

  return (
    <div {...restProps} className={panelClassName} style={appliedStyle}>
      {typeof children === "function" ? children({ open, close }) : children}
    </div>
  );
};

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style" | "children" | "onClick"
> & {
  onClick?: (event: MouseEvent<HTMLButtonElement>, open: boolean) => void;
  index?: number;
  children: ReactNode | ((open: boolean) => ReactNode);
  className?: string | ((open: boolean) => string);
  style?: CSSProperties | ((open: boolean) => CSSProperties);
};

const Button = ({
  onClick,
  className,
  style,
  children,
  ...restProps
}: ButtonProps) => {
  const [open, setOpen] = useDisclosure();

  const onClickToggle = (event: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event, !open);
    setOpen((prev) => !prev);
  };

  const appliedClassName =
    typeof className === "function" ? className(open) : className;
  const appliedStyle = typeof style === "function" ? style(open) : style;

  return (
    <button
      className={appliedClassName}
      style={appliedStyle}
      onClick={onClickToggle}
      type="button"
      {...restProps}
    >
      {typeof children === "function" ? children(open) : children}
    </button>
  );
};

interface DisclosureProps<T extends ElementType = "div"> {
  as?: T;
  index?: number;
  groupState?: [
    index: number,
    setIndex: (value: number | ((prev: number) => number)) => void
  ];
  children: ReactNode;
}

const Disclosure = <T extends ElementType = "div">({
  as,
  index,
  groupState,
  children,
  ...restProps
}: DisclosureProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof DisclosureProps<T>>) => {
  const state = useState(false);
  const [open, setOpen] = state;
  const currentIndex = groupState && groupState[0];

  useEffect(() => {
    if (index === undefined || !groupState) {
      return;
    }

    const setIndex = groupState[1];

    if (open && setIndex) {
      setIndex(index);
    }
    // eslint-disable-next-line
  }, [open]);

  useEffect(() => {
    if (index === undefined || !groupState) {
      return;
    }

    if (open && index !== currentIndex) {
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [currentIndex]);

  const Component = as || "div";

  return (
    <DisclosureContext.Provider value={state}>
      <Component {...restProps}>{children}</Component>
    </DisclosureContext.Provider>
  );
};

Disclosure.Button = Button;
Disclosure.Panel = Panel;

export default Disclosure;
