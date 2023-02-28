import { TeamMember } from "@/types/Team";
import { MEMBER_BORDER, MEMBER_HEIGHT, MEMBER_WIDTH } from "@/utils/constants";
import { TeamMemberAvatar } from "./TeamMemberAvatar";

type Props = {
  id: TeamMember["id"];
};

export const TeamMemberBox = ({ id }: Props) => {
  return (
    <div
      className="flex flex-col items-center py-2 border-dashed rounded-3xl bg-dam-blue-100 border-dam-blue-400"
      style={{
        width: MEMBER_WIDTH,
        height: MEMBER_HEIGHT,
        borderWidth: MEMBER_BORDER,
      }}
    >
      <TeamMemberAvatar id={id} />
    </div>
  );
};
