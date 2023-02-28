import { Team } from "@/types/Team";
import { TeamBoxSettings } from "@/types/TeamBoxSettings";
import {
  MEMBER_BORDER,
  MEMBER_HEIGHT,
  MEMBER_WIDTH,
  TEAM_PADDING,
} from "@/utils/constants";
import { atomFamily } from "recoil";

export const teamBoxAtomFamily = atomFamily<TeamBoxSettings, Team["id"]>({
  key: "teamBoxAtomFamily",
  default: {
    x: 0,
    y: 0,
    width: MEMBER_WIDTH * 2 + MEMBER_BORDER * 2 + TEAM_PADDING * 2,
    height: MEMBER_HEIGHT * 2 + MEMBER_BORDER * 2 + TEAM_PADDING * 2,
  },
});
