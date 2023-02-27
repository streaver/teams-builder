import { TeamMember } from "@/types/Team";
import { atom } from "recoil";

export const teamMemberIdsAtom = atom<TeamMember["id"][]>({
  key: "teamMemberIdsAtom",
  default: [],
});
