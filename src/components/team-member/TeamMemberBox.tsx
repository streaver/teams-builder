import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamColorSelectorFamily } from "@/state/recoil/selectors/teamColorSelectorFamily";
import { TeamMember } from "@/types/Team";
import {
  FULL_TIME_MEMBER_HEIGHT,
  MEMBER_BORDER,
  MEMBER_WIDTH,
  PART_TIME_MEMBER_HEIGHT,
  QUART_TIME_MEMBER_HEIGHT,
} from "@/utils/constants";
import { useRecoilValue } from "recoil";
import tinycolor from "tinycolor2";
import { TeamMemberAvatar } from "./avatar/TeamMemberAvatar";

type Props = {
  id: TeamMember["id"];
};

export const TeamMemberBox = ({ id }: Props) => {
  const member = useRecoilValue(teamMemberAtomFamily(id));

  const height =
    member.hours === 8
      ? FULL_TIME_MEMBER_HEIGHT
      : member.hours === 6
      ? PART_TIME_MEMBER_HEIGHT
      : QUART_TIME_MEMBER_HEIGHT;

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
        height,
        borderWidth: MEMBER_BORDER,
        backgroundColor: teamColorWithTransparency,
        borderColor: teamColor,
      }}
    >
      <TeamMemberAvatar id={id} />
    </div>
  );
};
