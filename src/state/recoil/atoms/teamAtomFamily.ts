import { Team } from "@/types/Team";
import { atomFamily } from "recoil";

export const teamAtomFamily = atomFamily<Team, Team["id"]>({
  key: "teamAtomFamily",
  default: (id) => ({
    id,
    name: "",
    clientId: null,
  }),
});
