import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamColorSelectorFamily } from "@/state/recoil/selectors/teamColorSelectorFamily";
import { TeamMember } from "@/types/Team";
import { MEMBER_BORDER, MEMBER_HEIGHT, MEMBER_WIDTH } from "@/utils/constants";
import { useRecoilValue } from "recoil";
import tinycolor from "tinycolor2";
import { TeamMemberAvatar } from "./avatar/TeamMemberAvatar";

type Props = {
  id: TeamMember["id"];
};

export const TeamMemberBox = ({ id }: Props) => {
  const member = useRecoilValue(teamMemberAtomFamily(id));
  const memberBoxHeight = (MEMBER_HEIGHT * member.hours) / 8;

  // The member always has a team at this point.
  const teamColor = useRecoilValue(teamColorSelectorFamily(member.teamId!));
  const teamColorWithTransparency = tinycolor(teamColor)
    .setAlpha(0.15)
    .toRgbString();

  return (
    <div
      className="flex flex-col items-center py-0.5 border-dashed rounded-3xl"
      style={{
        width: MEMBER_WIDTH,
        height: memberBoxHeight,
        borderWidth: MEMBER_BORDER,
        backgroundColor: teamColorWithTransparency,
        borderColor: teamColor,
      }}
    >
      <TeamMemberAvatar id={id} />
    </div>
  );
};
