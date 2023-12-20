import { createContext } from "react";
import DragNDropManager from "./dragNDropManager";

export const DragNDropContext = createContext<DragNDropManager | null>(null);