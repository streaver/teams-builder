import { Team } from "@/types/Team";
import { Size } from "@/types/TeamBoxSettings";
import { DEFAULT_TEAM_BOX_WIDTH } from "@/utils/constants";
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
        witdh: DEFAULT_TEAM_BOX_WIDTH,
        height: calculateTeamBoxHeight(teamMembers),
      };
    },
});
