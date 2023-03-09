import { useTeamMemberDrag } from "@/hooks/team-members-dnd";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import Image from "next/image";
import { useRecoilValue } from "recoil";

type Props = {
  id: number;
};

export const TeamMemberAvatar = ({ id }: Props) => {
  const teamMember = useRecoilValue(teamMemberAtomFamily(id));

  const shortName = `${teamMember.firstName} ${teamMember.lastName[0]}.`;

  const [{ isDragging }, dragRef] = useTeamMemberDrag(id);

  return isDragging ? (
    <div
      ref={dragRef}
      className="relative w-16 h-16 overflow-hidden bg-white rounded-full group"
    >
      <Image
        fill
        alt={`${teamMember.firstName} ${teamMember.lastName}`}
        src={teamMember.picture}
        className="object-contain rounded-full group-hover:opacity-60 hover:ring-2 ring-dam-gray-600"
      />
      <p className="absolute hidden w-full text-xs text-center truncate -translate-x-1/2 -translate-y-1/2 text-dam-gray-600 left-1/2 top-1/2 group-hover:block ">
        {shortName}
      </p>
    </div>
  ) : null;
};
