import { TeamMemberAvatar } from "@/components/team-member/avatar/TeamMemberAvatar";
import { TeamMember } from "@/types/Team";

type Props = {
  id: TeamMember["id"];
};

export const TeamMemberAvatarDragPreview = ({ id }: Props) => {
  return <TeamMemberAvatar id={id} />;
};
