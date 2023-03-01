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
    <Image
      width={64}
      height={64}
      alt={`${teamMember.firstName} ${teamMember.lastName}`}
      src={teamMember.picture}
      className="rounded-full"
    />
  );
};
