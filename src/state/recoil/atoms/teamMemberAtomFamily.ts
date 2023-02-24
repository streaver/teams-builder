import { TeamMember } from "@/types/Team";
import { atomFamily } from "recoil";

export const teamMemberAtomFamily = atomFamily<TeamMember, TeamMember["id"]>({
  key: "teamMemberAtomFamily",
  default: (id) => ({
    id,
    teamId: null,
  }),
});
