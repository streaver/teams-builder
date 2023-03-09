import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { TeamMember } from "@/types/Team";
import { MEMBER_BORDER, MEMBER_HEIGHT, MEMBER_WIDTH } from "@/utils/constants";
import { useRecoilValue } from "recoil";
import { TeamMemberAvatar } from "./avatar/TeamMemberAvatar";

type Props = {
  id: TeamMember["id"];
};

export const TeamMemberBox = ({ id }: Props) => {
  const member = useRecoilValue(teamMemberAtomFamily(id));
  const memberBoxHeight = (MEMBER_HEIGHT * member.hours) / 8;

  return (
    <div
      className="flex flex-col items-center py-0.5 border-dashed rounded-3xl bg-dam-blue-400 bg-opacity-[15%] border-dam-blue-400"
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
