import { Team } from "@/types/Team";
import { atom } from "recoil";

export const teamIdsAtom = atom<Team["id"][]>({
  key: "teamIdsAtom",
  default: [],
});
