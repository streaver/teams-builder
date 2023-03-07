import { TeamMember } from "@/types/Team";
import { MEMBER_BORDER, MEMBER_HEIGHT, MEMBER_WIDTH } from "@/utils/constants";
import { TeamMemberAvatar } from "./TeamMemberAvatar";

type Props = {
  id: TeamMember["id"];
  hours: TeamMember["hours"];
};

export const TeamMemberBox = ({ id, hours }: Props) => {
  const memberBoxHeight = (MEMBER_HEIGHT * hours) / 8;

  return (
    <div
      className="flex flex-col items-center py-2 border-dashed rounded-3xl bg-dam-blue-100 border-dam-blue-400"
      style={{
        width: MEMBER_WIDTH,
        height: memberBoxHeight,
        borderWidth: MEMBER_BORDER,
      }}
    >
      <TeamMemberAvatar id={id} />
    </div>
  );
};
