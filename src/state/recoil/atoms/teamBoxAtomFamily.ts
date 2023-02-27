import { Team } from "@/types/Team";
import { TeamBoxSettings } from "@/types/TeamBoxSettings";
import {
  TEAM_MEMBER_BOX_HEIGHT,
  TEAM_MEMBER_BOX_WIDTH,
} from "@/utils/constants";
import { atomFamily } from "recoil";

export const teamBoxAtomFamily = atomFamily<TeamBoxSettings, Team["id"]>({
  key: "teamBoxAtomFamily",
  default: {
    x: 0,
    y: 0,
    width: TEAM_MEMBER_BOX_WIDTH * 2,
    height: TEAM_MEMBER_BOX_HEIGHT * 2,
  },
});
