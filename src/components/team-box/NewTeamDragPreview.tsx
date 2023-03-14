import { TeamMember } from "@/types/Team";
import { DEFAULT_TEAM_BOX_HEIGHT, TEAM_PADDING } from "@/utils/constants";
import { TeamMemberBox } from "../team-member/TeamMemberBox";

type Props = {
  teamMemberId: TeamMember["id"];
};

export const NewTeamDragPreview = ({ teamMemberId }: Props) => {
  return (
    <div className="relative">
      <div
        className="absolute z-10 flex flex-col items-center justify-center gap-1 text-4xl border-2 border-dashed border-dam-gray-400 bg-white/60 rounded-3xl text-dam-gray-400"
        style={{
          top: -TEAM_PADDING * 2,
          left: -TEAM_PADDING * 2,
          height: DEFAULT_TEAM_BOX_HEIGHT,
          width: DEFAULT_TEAM_BOX_HEIGHT,
        }}
      >
        <p>Drop</p>
        <p>Here</p>
      </div>
      <TeamMemberBox id={teamMemberId} />
    </div>
  );
};
