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
  const teamMembers = [...useRecoilValue(teamMembersSelectorFamily(id))].sort(
    (member1, member2) => member2.hours - member1.hours
  );

  const screen = CanvasStore.screen;
  const isInScreen = inBounds(teamBox, screen);

  const [_, teamDragRef] = useTeamDrag(id);

  const [membersLeftCol, membersRightCol] = useMemo(() => {
    const leftCol: TeamMember[] = [];
    const rightCol: TeamMember[] = [];

    let totalHoursLeftCol = 0;
    let totalHoursRightCol = 0;

    teamMembers.forEach((member) => {
      if (totalHoursLeftCol <= totalHoursRightCol) {
        leftCol.push(member);
        totalHoursLeftCol += member.hours;
      } else {
        rightCol.push(member);
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
              {membersLeftCol.map((member) => (
                <TeamMemberBox
                  key={member.id}
                  id={member.id}
                  hours={member.hours}
                />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {membersRightCol.map((member) => (
                <TeamMemberBox
                  key={member.id}
                  id={member.id}
                  hours={member.hours}
                />
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
