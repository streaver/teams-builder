import { NewTeamDragPreview } from "@/components/team-box/NewTeamDragPreview";
import { TeamMemberAvatar } from "@/components/team-member/avatar/TeamMemberAvatar";
import { isTeamMemberDraggingOverDropZoneAtomFamily } from "@/state/recoil/atoms/isTeamMemberDraggingOverDropZoneAtomFamily";
import { TeamMember } from "@/types/Team";
import { DropZone } from "@/utils/dnd";
import { useRecoilValue } from "recoil";
import { TeamMemberBox } from "./TeamMemberBox";

type Props = {
  id: TeamMember["id"];
};

export const TeamMemberDragPreview = ({ id }: Props) => {
  const isDraggingOverCanvas = useRecoilValue(
    isTeamMemberDraggingOverDropZoneAtomFamily(DropZone.CANVAS)
  );
  const isDraggingOverCanvasEdges = useRecoilValue(
    isTeamMemberDraggingOverDropZoneAtomFamily(DropZone.CANVAS_EDGE)
  );
  const isDraggingOverTeam = useRecoilValue(
    isTeamMemberDraggingOverDropZoneAtomFamily(DropZone.TEAM_BOX)
  );

  return isDraggingOverCanvas || isDraggingOverCanvasEdges ? (
    <NewTeamDragPreview teamMemberId={id} />
  ) : isDraggingOverTeam ? (
    <TeamMemberBox id={id} />
  ) : (
    <TeamMemberAvatar id={id} />
  );
};
