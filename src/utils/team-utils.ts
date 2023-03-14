import { TeamMember } from "@/types/Team";
import {
  DEFAULT_TEAM_BOX_HEIGHT,
  FULL_TIME_MEMBER_HEIGHT,
  TEAM_BORDER,
  TEAM_GAP,
  TEAM_PADDING,
} from "./constants";

export const calculateTeamBoxHeight = (teamMembers: TeamMember[]): number => {
  const teamMembersSorted = [...teamMembers].sort(
    (member1, member2) => member2.hours - member1.hours
  );

  let totalHoursLeftCol = 0;
  let totalHoursRightCol = 0;

  teamMembersSorted.forEach((member) => {
    if (totalHoursLeftCol <= totalHoursRightCol) {
      totalHoursLeftCol += member.hours;
    } else {
      totalHoursRightCol += member.hours;
    }
  });

  const highestCol =
    totalHoursLeftCol > totalHoursRightCol
      ? totalHoursLeftCol
      : totalHoursRightCol;

  const rowsNeeded = Math.ceil(highestCol / 8);

  const totalHeight =
    rowsNeeded * FULL_TIME_MEMBER_HEIGHT +
    (rowsNeeded - 1) * TEAM_GAP +
    2 * TEAM_PADDING +
    2 * TEAM_BORDER;

  // If the new height < default height (2x2), totalheigth = default height
  return totalHeight < DEFAULT_TEAM_BOX_HEIGHT
    ? DEFAULT_TEAM_BOX_HEIGHT
    : totalHeight;
};

export const randomTeamId = () => {
  const min = 100;
  const max = Number.MAX_SAFE_INTEGER;

  return Math.floor(Math.random() * (max - min + 1) + min);
};
