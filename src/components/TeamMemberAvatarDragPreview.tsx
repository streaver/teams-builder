import { TeamMember } from "@/types/Team";
import { TeamMemberAvatar } from "./TeamMemberAvatar";

type Props = {
  id: TeamMember["id"];
};

export const TeamMemberAvatarDragPreview = ({ id }: Props) => {
  return <TeamMemberAvatar id={id} />;
};
