import { TeamMember } from "@/types/Team";
import {
  MEMBER_BORDER,
  MEMBER_WIDTH,
  TEAM_GAP,
  TEAM_PADDING,
} from "@/utils/constants";
import { TeamMemberBox } from "../team-member/TeamMemberBox";

// TODO move to constants
const TEAM_BOX_DEFAULT_SIZE =
  2 * (MEMBER_WIDTH + TEAM_PADDING + MEMBER_BORDER) + TEAM_GAP;

type Props = {
  teamMemberId: TeamMember["id"];
};

export const NewTeamDragPreview = ({ teamMemberId }: Props) => {
  return (
    <div className="relative">
      <div
        className="absolute z-10 flex flex-col items-center justify-center gap-1 text-4xl border-2 border-dashed -top-2 -left-2 border-dam-gray-400 bg-white/60 rounded-3xl text-dam-gray-400"
        style={{
          height: TEAM_BOX_DEFAULT_SIZE,
          width: TEAM_BOX_DEFAULT_SIZE,
        }}
      >
        <p>Drop</p>
        <p>Here</p>
      </div>
      <TeamMemberBox id={teamMemberId} />
    </div>
  );
};
