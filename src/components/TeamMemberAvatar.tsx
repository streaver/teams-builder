import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import Image from "next/image";
import { useRecoilValue } from "recoil";

type Props = {
  id: number;
};

export const TEAM_MEMBER_AVATAR = "team_member_avatar";

export const TeamMemberAvatar = ({ id }: Props) => {
  const teamMember = useRecoilValue(teamMemberAtomFamily(id));

  return (
    <div className="relative w-16 rounded-full aspect-square">
      <Image
        fill
        alt={`${teamMember.firstName} ${teamMember.lastName}`}
        src={teamMember.picture}
      />
    </div>
  );
};
