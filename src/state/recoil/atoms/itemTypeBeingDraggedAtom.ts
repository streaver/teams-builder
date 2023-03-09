import { DraggableItemType } from "@/utils/dnd";
import { atom } from "recoil";

export const itemTypeBeingDraggedAtom = atom<DraggableItemType | null>({
  key: "itemTypeBeingDraggedAtom",
  default: null,
});
