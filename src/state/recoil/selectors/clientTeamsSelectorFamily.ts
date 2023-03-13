import { Client } from "@/types/Client";
import { Team } from "@/types/Team";
import { selectorFamily } from "recoil";
import { teamsSelector } from "./teamsSelector";

export const clientTeamsSelectorFamily = selectorFamily<Team[], Client["id"]>({
  key: "clientTeamsSelectorFamily",
  get:
    (clientId) =>
    ({ get }) => {
      const teams = get(teamsSelector);
      return teams.filter((team) => team.clientId === clientId);
    },
});
