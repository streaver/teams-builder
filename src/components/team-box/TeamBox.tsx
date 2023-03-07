import { TeamMemberBox } from "@/components/team-member/TeamMemberBox";
import { teamAtomFamily } from "@/state/recoil/atoms/teamAtomFamily";
import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import { Team, TeamMember } from "@/types/Team";
import { TEAM_PADDING } from "@/utils/constants";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

type Props = {
  id: Team["id"];
};

export const TeamBox = ({ id }: Props) => {
  const team = useRecoilValue(teamAtomFamily(id));
  const teamMembers = useRecoilValue(teamMembersSelectorFamily(id));

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
      className="relative grid grid-cols-2 gap-2"
      style={{ padding: TEAM_PADDING }}
    >
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
      <span className="absolute -translate-x-1/2 left-1/2 -bottom-8">
        {team.name}
      </span>
    </div>
  );
};