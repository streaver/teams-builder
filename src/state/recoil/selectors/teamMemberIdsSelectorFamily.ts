import { Team, TeamMember } from "@/types/Team";
import { selectorFamily } from "recoil";
import { teamMemberAtomFamily } from "../atoms/teamMemberAtomFamily";
import { teamMemberIdsAtom } from "../atoms/teamMemberIdsAtom";

export const teamMemberIdsSelectorFamily = selectorFamily<
  TeamMember["id"][],
  Team["id"] | null
>({
  key: "teamMemberIdsSelectorFamily",
  get:
    (teamId) =>
    ({ get }) => {
      const teamMemberIds = get(teamMemberIdsAtom);

      return teamMemberIds.filter((teamMemberId) => {
        const teamMember = get(teamMemberAtomFamily(teamMemberId));
        return teamMember.teamId === teamId;
      });
    },
});
