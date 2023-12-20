import setDragNDrop from "./DragNDrop";
export { useDragNDropState, useDragNDropControls, useDragNDropSubscribe, useDragNDropSubscribeToDropEvent } from "./hooks/useDragNDrop";

const DragNDrop = setDragNDrop();

export const setDragNDropComponent = setDragNDrop;
export default DragNDrop;