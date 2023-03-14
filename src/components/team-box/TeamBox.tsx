import { teamAtomFamily } from "@/state/recoil/atoms/teamAtomFamily";
import { teamBoxSizeSelectorFamily } from "@/state/recoil/selectors/teamBoxSizeSelectorFamily";
import { teamColorSelectorFamily } from "@/state/recoil/selectors/teamColorSelectorFamily";
import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import { Team, TeamMember } from "@/types/Team";
import { TEAM_BORDER, TEAM_GAP, TEAM_PADDING } from "@/utils/constants";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import tinycolor from "tinycolor2";
import { DraggableTeamMember } from "../team-member/DraggableTeamMember";

type Props = {
  id: Team["id"];
};

export const TeamBox = ({ id }: Props) => {
  const teamBoxSize = useRecoilValue(teamBoxSizeSelectorFamily(id));
  const team = useRecoilValue(teamAtomFamily(id));
  const teamMembers = useRecoilValue(teamMembersSelectorFamily(id));
  const teamColor = useRecoilValue(teamColorSelectorFamily(id));
  const teamColorWithTransparency = tinycolor(teamColor)
    .setAlpha(0.15)
    .toRgbString();

  const [membersLeftCol, membersRightCol] = useMemo(() => {
    const teamMembersSorted = [...teamMembers].sort(
      (member1, member2) => member2.hours - member1.hours
    );

    const leftCol: TeamMember["id"][] = [];
    const rightCol: TeamMember["id"][] = [];

    let totalHoursLeftCol = 0;
    let totalHoursRightCol = 0;

    teamMembersSorted.forEach((member) => {
      if (totalHoursLeftCol <= totalHoursRightCol) {
        leftCol.push(member.id);
        totalHoursLeftCol += member.hours;
      } else {
        rightCol.push(member.id);
        totalHoursRightCol += member.hours;
      }
    });

    return [leftCol, rightCol];
  }, [teamMembers]);

  return (
    <div
      className="relative grid items-center justify-center h-full grid-cols-2 border-dashed rounded-3xl"
      style={{
        padding: TEAM_PADDING,
        gap: TEAM_GAP,
        borderWidth: TEAM_BORDER,
        backgroundColor: teamColorWithTransparency,
        borderColor: teamColor,
        ...teamBoxSize,
      }}
    >
      <div
        className="flex flex-col h-full"
        style={{
          gap: TEAM_GAP,
        }}
      >
        {membersLeftCol.map((memberId) => (
          <DraggableTeamMember key={memberId} id={memberId} withSurrondingBox />
        ))}
      </div>
      <div
        className="flex flex-col h-full"
        style={{
          gap: TEAM_GAP,
        }}
      >
        {membersRightCol.map((memberId) => (
          <DraggableTeamMember key={memberId} id={memberId} withSurrondingBox />
        ))}
      </div>
      <span className="absolute -translate-x-1/2 left-1/2 -bottom-8">
        {team.name}
      </span>
    </div>
  );
};
