import { Team, TeamMember } from "@/types/Team";
import { selectorFamily } from "recoil";
import { teamMemberAtomFamily } from "../atoms/teamMemberAtomFamily";
import { teamMemberIdsAtom } from "../atoms/teamMemberIdsAtom";

export const teamMembersSelectorFamily = selectorFamily<
  TeamMember[],
  Team["id"] | null
>({
  key: "teamMembersSelectorFamily",
  get:
    (teamId) =>
    ({ get }) => {
      const teamMembers = get(teamMemberIdsAtom).map((id) =>
        get(teamMemberAtomFamily(id))
      );

      return teamMembers.filter((member) => {
        return member.teamId === teamId;
      });
    },
});
