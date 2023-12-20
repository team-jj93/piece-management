"use client";

import { HTMLAttributes, ReactNode, useMemo, useRef } from "react";
import DragNDropManager, { DropListener } from "./utils/dragNDropManager";
import { DragNDropContext } from "./utils/dragNDropContext";
import {
  useDragNDropControls,
  useDragNDropState,
  useDragNDropSubscribeToDropEvent,
} from "./hooks/useDragNDrop";
import Draggable from "./components/Draggable";
import setDropArea from "./components/DropArea";
import { cn } from "@/utils/cn";

type DragNDropProps<T = any> = {
  children: ReactNode;
  dropCallback: DropListener<T>;
  dependencies?: any[];
} & HTMLAttributes<HTMLDivElement>;

// TO-DO
// * position 조정을 해야한다.
// onDrag을 가지고 다시 로직을 작성해야함.
const DragNDrop = ({
  children,
  dropCallback,
  dependencies,
  className,
  ...restProps
}: DragNDropProps) => {
  const draggingElement = useRef<HTMLElement | null>(null);
  const { id, isDragging, dragStartId } = useDragNDropState();
  const { drop, cancle, setPosition } = useDragNDropControls();

  const setPositionElement = (event: React.MouseEvent | React.TouchEvent) => {
    let clientX = 0;
    let clientY = 0;

    // 마우스 이벤트와 터치 이벤트를 구분하여 처리
    if (
      event.type === "touchmove" &&
      "touches" in event &&
      event.touches.length > 0
    ) {
      // 터치 이벤트 처리
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if ("clientX" in event && "clientY" in event) {
      // 마우스 이벤트 처리
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      // 이벤트 타입이 예상과 다른 경우
      return;
    }

    setPosition({ x: clientX, y: clientY });
  };

  const dragElement = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) {
      return;
    }

    if (!draggingElement.current) {
      draggingElement.current = document.getElementById(`${id}-${dragStartId}`);
      return;
    }

    let clientX, clientY;

    // 마우스 이벤트와 터치 이벤트를 구분하여 처리
    if (
      event.type === "touchmove" &&
      "touches" in event &&
      event.touches.length > 0
    ) {
      // 터치 이벤트 처리
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if ("clientX" in event && "clientY" in event) {
      // 마우스 이벤트 처리
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      // 이벤트 타입이 예상과 다른 경우
      return;
    }

    draggingElement.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
  };

  const cancelDrag = () => {
    draggingElement.current = null;
    cancle();
  };

  const dropElement = () => {
    if (!isDragging) {
      return;
    }
    drop();
    draggingElement.current = null;
  };

  useDragNDropSubscribeToDropEvent(dropCallback, dependencies);

  return (
    <div
      className={cn(className, {
        ["cursor-grab relative select-none"]: isDragging,
      })}
      {...restProps}
      onMouseEnter={setPositionElement}
      onMouseDown={dragElement}
      onMouseMove={dragElement}
      onTouchMove={dragElement}
      onMouseUp={dropElement}
      onTouchEnd={dropElement}
      onMouseLeave={cancelDrag}
      onTouchCancel={cancelDrag}
    >
      {children}
      <div
        id={id}
        className="fixed top-0 left-0 z-100 w-[0.5px] h-[0.5px] bg-purple-500 pointer-events-none"
      ></div>
    </div>
  );
};

function setDragNDrops<T = any>() {
  function DragNDropProvider(props: DragNDropProps<T>) {
    // eslint-disable-next-line
    const dragNDropManager = useMemo(() => new DragNDropManager(), []);

    return (
      <DragNDropContext.Provider value={dragNDropManager}>
        <DragNDrop {...props} />
      </DragNDropContext.Provider>
    );
  }

  const DropArea = setDropArea<T>();

  DragNDropProvider.DropArea = DropArea;
  DragNDropProvider.Draggable = Draggable;

  return DragNDropProvider;
}

export default setDragNDrops;
