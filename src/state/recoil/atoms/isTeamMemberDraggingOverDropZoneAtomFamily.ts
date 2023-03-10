import { DropZone } from "@/utils/dnd";
import { atomFamily } from "recoil";

export const isTeamMemberDraggingOverDropZoneAtomFamily = atomFamily<
  boolean,
  DropZone
>({
  key: "isTeamMemberDraggingOverDropZoneAtomFamily",
  default: false,
});
