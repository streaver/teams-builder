import { useTeamDrag } from "@/hooks/team-dnd";
import CanvasStore from "@/state/CanvasStore";
import { teamAtomFamily } from "@/state/recoil/atoms/teamAtomFamily";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import { TeamMember } from "@/types/Team";
import { TEAM_PADDING } from "@/utils/constants";
import { inBounds } from "@/utils/math-utils";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { TeamBoxWrapper } from "./TeamBoxWrapper";
import { TeamMemberBox } from "./TeamMemberBox";

type Props = {
  id: number;
};

export const TeamBox = ({ id }: Props) => {
  const teamBox = useRecoilValue(teamBoxAtomFamily(id));
  const team = useRecoilValue(teamAtomFamily(id));
  const teamMembers = useRecoilValue(teamMembersSelectorFamily(id));

  const screen = CanvasStore.screen;
  const isInScreen = inBounds(teamBox, screen);

  const [_, teamDragRef] = useTeamDrag(id);

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

  return isInScreen ? (
    <TeamBoxWrapper id={id}>
      <div
        className="absolute border-2 border-dashed rounded-3xl bg-dam-blue-100 border-dam-blue-400"
        style={{
          left: teamBox.x - screen.x,
          top: teamBox.y - screen.y,
          width: teamBox.width,
          height: teamBox.height,
        }}
        ref={teamDragRef}
      >
        <div
          className="relative flex flex-wrap h-full gap-2"
          style={{ padding: TEAM_PADDING }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              {membersLeftCol.map((memberId) => (
                <TeamMemberBox key={memberId} id={memberId} />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {membersRightCol.map((memberId) => (
                <TeamMemberBox key={memberId} id={memberId} />
              ))}
            </div>
          </div>
        </div>
        <span className="absolute -translate-x-1/2 left-1/2 -bottom-8">
          {team.name}
        </span>
      </div>
    </TeamBoxWrapper>
  ) : null;
};
