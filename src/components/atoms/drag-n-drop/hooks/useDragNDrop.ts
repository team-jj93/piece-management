import { useCallback, useContext, useEffect, useRef, useSyncExternalStore } from "react";
import { DragNDropContext } from "../utils/dragNDropContext";
import { DragNDropManagerListener, DropListener } from "../utils/dragNDropManager";

export function useDragNDropManager() {
  const dragNDropManager = useContext(DragNDropContext);

  if (!dragNDropManager) {
    throw new Error("useDragNDropManager must be used within a DragNDropProvider");
  }

  return dragNDropManager;
}

export function useDragNDropState() {
  const dragNDropManager = useDragNDropManager();

  return useSyncExternalStore(dragNDropManager.subscribe, dragNDropManager.getState, dragNDropManager.getState);
}

export function useDragNDropControls() {
  return useDragNDropManager().getControls();
}

export function useDragNDropSubscribe(listener: DragNDropManagerListener, dependencies: any[]) {
  const listenerRef = useRef<DragNDropManagerListener>();
  const dragNDropManager = useDragNDropManager();
  // eslint-disable-next-line
  const memoizedListener = useCallback(listener, dependencies);

  useEffect(() => {
    if (listenerRef.current) {
      dragNDropManager.unSubscribe(listenerRef.current);
    }

    listenerRef.current = memoizedListener;

    return dragNDropManager.subscribe(memoizedListener);
    // eslint-disable-next-line
  }, [memoizedListener]);
}

export function useDragNDropSubscribeToDropEvent(listener: DropListener, dependencies: any[] = []) {
  const listenerRef = useRef<DropListener>();
  const dragNDropManager = useDragNDropManager();
  // eslint-disable-next-line
  const memoizedListener = useCallback(listener, dependencies);

  useEffect(() => {
    if (listenerRef.current) {
      dragNDropManager.unSubscribeToDropEvent(listenerRef.current);
    }

    listenerRef.current = memoizedListener;

    return dragNDropManager.subscribeToDropEvent(memoizedListener);
    // eslint-disable-next-line
  }, [memoizedListener]);
}