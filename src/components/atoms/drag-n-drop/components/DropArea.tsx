import { CSSProperties, ReactNode } from "react";
import { DragNDropState } from "../utils/dragNDropManager";
import { useDragNDropControls, useDragNDropState } from "../hooks/useDragNDrop";

interface DropProps<T = any> {
  id: string | number;
  style?:
    | CSSProperties
    | ((isDragging: boolean, isTarget: boolean) => CSSProperties);
  className?: string | ((isDragging: boolean, isTarget: boolean) => string);
  payload: T | ((dragNDropState: DragNDropState) => T);
  children?:
    | ReactNode
    | ((state: {
        isDragging: boolean;
        isTarget: boolean;
        isStart: boolean;
      }) => ReactNode);
}

function setDropArea<T = any>() {
  function DropArea({ id, style, className, payload, children }: DropProps<T>) {
    const { isDragging, dropTargetId, dragStartId } = useDragNDropState();
    const { enter, drop } = useDragNDropControls();

    const isTarget = id === dropTargetId;
    const isStart = id === dragStartId;
    const enterElement = () => {
      if (!isDragging) {
        return;
      }
      enter(id, payload);
    };
    const dropElement = () => {
      if (!isDragging) {
        return;
      }

      drop(payload);
    };

    return (
      <div
        onMouseEnter={enterElement}
        onTouchMove={enterElement}
        onMouseUp={dropElement}
        onTouchEnd={dropElement}
        style={
          typeof style === "function" ? style(isDragging, isTarget) : style
        }
        className={
          typeof className === "function"
            ? className(isDragging, isTarget)
            : className
        }
      >
        {typeof children === "function"
          ? children({ isDragging, isTarget, isStart })
          : children}
      </div>
    );
  }

  return DropArea;
}

export default setDropArea;
