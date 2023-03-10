import { Position } from "@/types/Box";
import { Team } from "@/types/Team";
import { atomFamily } from "recoil";

export const teamBoxPositionAtomFamily = atomFamily<Position, Team["id"]>({
  key: "teamBoxPositionAtomFamily",
  default: {
    x: 0,
    y: 0,
  },
});
