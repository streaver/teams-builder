import { atom } from "recoil";

export const isTeamMemberDraggingOverCanvasAtom = atom<boolean>({
  key: "isTeamMemberDraggingOverCanvasAtom",
  default: false,
});
