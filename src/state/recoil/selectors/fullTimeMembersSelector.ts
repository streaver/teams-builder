import { TeamMember } from "@/types/Team";
import { selector } from "recoil";
import { teamMemberAtomFamily } from "../atoms/teamMemberAtomFamily";
import { teamMemberIdsAtom } from "../atoms/teamMemberIdsAtom";

const isFullTime = (member: TeamMember) => member.hours === 8;

export const fullTimeMembersSelector = selector<TeamMember[]>({
  key: "fullTimeMembersSelector",
  get: ({ get }) => {
    const teamMemberIds = get(teamMemberIdsAtom);

    return teamMemberIds
      .map((memberId) => get(teamMemberAtomFamily(memberId)))
      .filter(isFullTime);
  },
});
