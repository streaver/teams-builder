import colors from "@/styles/colors";
import { Team } from "@/types/Team";
import { constSelector, selectorFamily } from "recoil";
import { clientAtomFamily } from "../atoms/clientAtomFamily";
import { teamAtomFamily } from "../atoms/teamAtomFamily";

export const teamColorSelectorFamily = selectorFamily<string, Team["id"]>({
  key: "teamColorSelectorFamily",
  get:
    (teamId) =>
    ({ get }) => {
      const team = get(teamAtomFamily(teamId));
      const client = get(
        team.clientId ? clientAtomFamily(team.clientId) : constSelector(null)
      );

      return client?.color ?? colors["dam-blue"][400];
    },
});
