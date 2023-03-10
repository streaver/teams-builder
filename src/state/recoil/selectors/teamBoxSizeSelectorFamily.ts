import { Team } from "@/types/Team";
import { Size } from "@/types/TeamBoxSettings";
import {
  MEMBER_BORDER,
  MEMBER_WIDTH,
  TEAM_GAP,
  TEAM_PADDING,
} from "@/utils/constants";
import { calculateTeamBoxHeight } from "@/utils/teams-utils";
import { selectorFamily } from "recoil";
import { teamMembersSelectorFamily } from "./teamMembersSelectorFamily";

export const teamBoxSizeSelectorFamily = selectorFamily<Size, Team["id"]>({
  key: "teamBoxSizeSelectorFamily",
  get:
    (teamId) =>
    ({ get }) => {
      const teamMembers = get(teamMembersSelectorFamily(teamId));

      // For the time being, the width is constant and only its height is dynamic
      return {
        witdh:
          2 * MEMBER_WIDTH + 2 * TEAM_PADDING + 2 * MEMBER_BORDER + TEAM_GAP,
        height: calculateTeamBoxHeight(teamMembers),
      };
    },
});
