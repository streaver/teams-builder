import { TeamMember } from "@/types/Team";
import {
  DEFAULT_TEAM_BOX_HEIGHT,
  MEMBER_BORDER,
  MEMBER_HEIGHT,
  TEAM_GAP,
  TEAM_PADDING,
} from "./constants";

export const calculateTeamBoxHeight = (teamMembers: TeamMember[]): number => {
  const teamMembersSorted = [...teamMembers].sort(
    (member1, member2) => member2.hours - member1.hours
  );

  let totalHoursLeftCol = 0;
  let totalHoursRightCol = 0;
  let totalMembersLeftCol = 0;
  let totalMembersRightCol = 0;

  teamMembersSorted.forEach((member) => {
    if (totalHoursLeftCol <= totalHoursRightCol) {
      totalHoursLeftCol += member.hours;
      totalMembersLeftCol += 1;
    } else {
      totalHoursRightCol += member.hours;
      totalMembersRightCol += 1;
    }
  });

  const [totalHoursCol, totalMembersCol] =
    totalHoursLeftCol > totalHoursRightCol
      ? [totalHoursLeftCol, totalMembersLeftCol]
      : [totalHoursRightCol, totalMembersRightCol];

  const heightByHours = (MEMBER_HEIGHT / 8) * totalHoursCol; // (Height per hour) * column total hours
  const heightBorders = MEMBER_BORDER * totalMembersCol;

  let totalHeight =
    heightByHours +
    heightBorders +
    TEAM_PADDING * totalMembersCol +
    (totalMembersCol - 1) * TEAM_GAP;

  // If the new height < default height (2x2), totalheigth = default height
  if (totalHeight < DEFAULT_TEAM_BOX_HEIGHT) {
    totalHeight = DEFAULT_TEAM_BOX_HEIGHT;
  }

  return totalHeight;
};
