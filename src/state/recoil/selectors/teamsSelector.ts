import { Team } from "@/types/Team";
import { selector } from "recoil";
import { teamAtomFamily } from "../atoms/teamAtomFamily";
import { teamIdsAtom } from "../atoms/teamIdsAtom";

export const teamsSelector = selector<Team[]>({
  key: "teamsSelector",
  get: ({ get }) => {
    const teamIds = get(teamIdsAtom);
    return teamIds.map((teamId) => get(teamAtomFamily(teamId)));
  },
});
