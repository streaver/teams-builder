import { NewTeamDragPreview } from "@/components/team-box/NewTeamDragPreview";
import { TeamMemberAvatar } from "@/components/team-member/avatar/TeamMemberAvatar";
import { isTeamMemberDraggingOverCanvasAtom } from "@/state/recoil/atoms/isTeamMemberDraggingOverCanvasAtom";
import { TeamMember } from "@/types/Team";
import { useRecoilValue } from "recoil";

type Props = {
  id: TeamMember["id"];
};

export const TeamMemberAvatarDragPreview = ({ id }: Props) => {
  const isTeamMemberDraggingOverCanvas = useRecoilValue(
    isTeamMemberDraggingOverCanvasAtom
  );

  return isTeamMemberDraggingOverCanvas ? (
    <NewTeamDragPreview teamMemberId={id} />
  ) : (
    <TeamMemberAvatar id={id} />
  );
};
