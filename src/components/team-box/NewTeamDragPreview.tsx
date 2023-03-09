import { TeamMember } from "@/types/Team";
import { DEFAULT_TEAM_BOX_HEIGHT } from "@/utils/constants";
import { TeamMemberBox } from "../team-member/TeamMemberBox";

type Props = {
  teamMemberId: TeamMember["id"];
};

export const NewTeamDragPreview = ({ teamMemberId }: Props) => {
  return (
    <div className="relative">
      <div
        className="absolute z-10 flex flex-col items-center justify-center gap-1 text-4xl border-2 border-dashed -top-2 -left-2 border-dam-gray-400 bg-white/60 rounded-3xl text-dam-gray-400"
        style={{
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
