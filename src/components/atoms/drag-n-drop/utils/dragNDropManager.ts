interface ElementPosition {
  x: number;
  y: number;
}

export interface DragNDropState {
  id: string;
  dragStartId: number | string | null;
  dropTargetId: number | string | null;
  isDragging: boolean;
  dragStartState: any | null;
  payload: any;
  getPosition: () => ElementPosition;
}

interface DragNDropControls {
  start: (dragStartId: number | string, dragStartState?: any) => void;
  enter: (dropTargetId: number | string | null, payload?: any) => void;
  cancle: () => void;
  drop: (payload?: any | ((dragNDropState: DragNDropState) => any)) => void;
  setPosition: (position: ElementPosition) => void;
}

export type DragNDropManagerListener = (dragNDropState: DragNDropState) => void;
export type DropListener<T = any> = (payload: T, dragNDropState: DragNDropState) => void;

let id = 0;

class DragNDropManager {
  private id: string = "";
  private dragStartId: number | string | null = null;
  private dropTargetId: number | string | null = null;
  private dragStartState: any = null;
  private payload: any = null;
  private dragNDropState!: DragNDropState;
  private dragNDropControls!: DragNDropControls;
  private listeners: Set<DragNDropManagerListener> = new Set();
  private dropListeners: Set<DropListener> = new Set();
  private position: ElementPosition = { x: 0, y: 0 };

  constructor() {
    this.id = `dragNdrop-${++id}`;
    this.bind();
    this.setState();
    this.setControls();
  }

  private init() {
    this.dragStartId = null;
    this.dropTargetId = null;
    this.payload = null;
    this.dragStartState = null;
    this.position = { x: 0, y: 0 };
  }

  private bind() {
    this.getState = this.getState.bind(this);
    this.getControls = this.getControls.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.start = this.start.bind(this);
    this.enter = this.enter.bind(this);
    this.cancle = this.cancle.bind(this);
    this.drop = this.drop.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.subscribeToDropEvent = this.subscribeToDropEvent.bind(this);
    this.unSubscribe = this.unSubscribe.bind(this);
    this.unSubscribeToDropEvent = this.unSubscribeToDropEvent.bind(this);
  }

  private setState() {
    this.dragNDropState = {
      id: this.id,
      dragStartId: this.dragStartId,
      dropTargetId: this.dropTargetId,
      isDragging: this.dragStartId !== null,
      dragStartState: this.dragStartState,
      payload: this.payload,
      getPosition: this.getPosition
    }
  }

  private setControls() {
    this.dragNDropControls = {
      setPosition: this.setPosition,
      start: this.start,
      enter: this.enter,
      cancle: this.cancle,
      drop: this.drop
    }
  }

  private notify() {
    this.setState();
    this.listeners.forEach(listener => listener(this.dragNDropState));
  }

  getId() {
    return this.id;
  }

  getState() {
    return this.dragNDropState;
  }

  getControls() {
    return this.dragNDropControls;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position: ElementPosition) {
    this.position = position;
  }

  start(dragStartId: number | string, dragStartState: any = null) {
    this.dragStartId = dragStartId;
    this.dragStartState = dragStartState;

    this.notify();
  }

  enter(dropTargetId: number | string | null, payload: any = null) {
    this.dropTargetId = dropTargetId;
    this.payload = payload;

    this.notify();
  }

  cancle() {
    this.init();
    this.notify();
  }

  drop(payload?: any | ((dragNDropState: DragNDropState) => any)) {
    if (!this.dropTargetId || this.dropTargetId === this.dragStartId) {
      this.cancle();

      return;
    }

    if (payload) {
      this.payload = typeof payload === "function" ? payload(this.dragNDropState) : payload;
    }

    this.notify();
    this.dropListeners.forEach(listener => listener(this.payload, this.dragNDropState));
    this.init();
  }

  subscribe(listener: DragNDropManagerListener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    }
  }

  subscribeToDropEvent(listener: DropListener) {
    this.dropListeners.add(listener);

    return () => {
      this.dropListeners.delete(listener);
    }
  }

  unSubscribe(listener: DragNDropManagerListener) {
    this.listeners.delete(listener);
  }

  unSubscribeToDropEvent(listener: DropListener) {
    this.dropListeners.delete(listener);
  }

}

export default DragNDropManager;