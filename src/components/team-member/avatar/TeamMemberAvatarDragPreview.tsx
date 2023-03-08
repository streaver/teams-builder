import { NewTeamDragPreview } from "@/components/team-box/NewTeamDragPreview";
import { TeamMemberAvatar } from "@/components/team-member/avatar/TeamMemberAvatar";
import { isTeamMemberDraggingOverDropZoneAtomFamily } from "@/state/recoil/atoms/isTeamMemberDraggingOverDropZoneAtomFamily";
import { TeamMember } from "@/types/Team";
import { DropZone } from "@/utils/dnd";
import { useRecoilValue } from "recoil";

type Props = {
  id: TeamMember["id"];
};

export const TeamMemberAvatarDragPreview = ({ id }: Props) => {
  const isDraggingOverCanvas = useRecoilValue(
    isTeamMemberDraggingOverDropZoneAtomFamily(DropZone.CANVAS)
  );
  const isDraggingOverCanvasEdges = useRecoilValue(
    isTeamMemberDraggingOverDropZoneAtomFamily(DropZone.CANVAS_EDGE)
  );

  return isDraggingOverCanvas || isDraggingOverCanvasEdges ? (
    <NewTeamDragPreview teamMemberId={id} />
  ) : (
    <TeamMemberAvatar id={id} />
  );
};
