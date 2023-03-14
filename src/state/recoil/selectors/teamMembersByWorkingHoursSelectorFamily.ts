import { TeamMember } from "@/types/Team";
import { WorkingHours } from "@/utils/team-members-utils";
import { selectorFamily } from "recoil";
import { teamMemberAtomFamily } from "../atoms/teamMemberAtomFamily";
import { teamMemberIdsAtom } from "../atoms/teamMemberIdsAtom";

export const teamMembersByWorkingHoursSelectorFamily = selectorFamily<
  TeamMember[],
  WorkingHours
>({
  key: "teamMembersByWorkingHoursSelectorFamily",
  get:
    (workingHours) =>
    ({ get }) => {
      const teamMemberIds = get(teamMemberIdsAtom);

      return teamMemberIds
        .map((memberId) => get(teamMemberAtomFamily(memberId)))
        .filter((teamMember) => teamMember.hours === workingHours);
    },
});
