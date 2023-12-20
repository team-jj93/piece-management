import { HTMLAttributes, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDragNDropControls, useDragNDropState } from "../hooks/useDragNDrop";
import { cn } from "@/utils/cn";

interface DraggingElementProps {
  id: string;
  dragNDropManagerId: string;
  getPosition: () => { x: number; y: number };
  children: ReactNode;
}

const DraggingElement = ({
  id,
  dragNDropManagerId,
  getPosition,
  children,
}: DraggingElementProps) => {
  const { x, y } = getPosition();

  return createPortal(
    <div
      id={id}
      className="absolute bg-black left-0 top-0 z-40 pointer-events-none"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {children}
    </div>,
    document.getElementById(dragNDropManagerId) as HTMLElement
  );
};

type DraggableProps = {
  id: string;
  children: ReactNode | ((dragStart: () => void) => ReactNode);
} & HTMLAttributes<HTMLDivElement>;

const Draggable = ({
  id,
  children,
  className,
  ...restProps
}: DraggableProps) => {
  const {
    isDragging,
    dragStartId,
    id: dragNDropManagerId,
    getPosition,
  } = useDragNDropState();
  const { start } = useDragNDropControls();

  const dragStart = () => {
    start(id);
  };

  return (
    <div
      className={cn(
        "cursor-pointer",
        {
          ["pointer-events-none relative overflow-hidden"]: isDragging,
        },
        className
      )}
      onMouseDown={dragStart}
      onTouchStart={dragStart}
      {...restProps}
    >
      {id !== dragStartId ? (
        typeof children === "function" ? (
          children(dragStart)
        ) : (
          children
        )
      ) : (
        <DraggingElement
          id={`${dragNDropManagerId}-${id}`}
          dragNDropManagerId={dragNDropManagerId}
          getPosition={getPosition}
        >
          {typeof children === "function" ? children(dragStart) : children}
        </DraggingElement>
      )}
      {isDragging && (
        <div className="absolute pointer-events-auto z-10 left-0 top-0 w-full h-full" />
      )}
    </div>
  );
};

export default Draggable;
