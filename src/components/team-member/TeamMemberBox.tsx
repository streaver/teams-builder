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
import { WorkingHours } from "@/utils/team-members-utils";
import { useRecoilValue } from "recoil";
import tinycolor from "tinycolor2";
import { TeamMemberAvatar } from "./avatar/TeamMemberAvatar";

type Props = {
  id: TeamMember["id"];
};

const WORKINGHOURS_HEIGHT = {
  [WorkingHours.FULL_TIME]: FULL_TIME_MEMBER_HEIGHT,
  [WorkingHours.PART_TIME]: PART_TIME_MEMBER_HEIGHT,
  [WorkingHours.QUART_TIME]: QUART_TIME_MEMBER_HEIGHT,
};

export const TeamMemberBox = ({ id }: Props) => {
  const member = useRecoilValue(teamMemberAtomFamily(id));
  const height = WORKINGHOURS_HEIGHT[member.hours];

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
