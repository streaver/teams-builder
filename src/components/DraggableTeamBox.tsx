import { useTeamDrag } from "@/hooks/team-dnd";
import { useTeamMemberDrop } from "@/hooks/team-members-dnd";
import CanvasStore from "@/state/CanvasStore";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { inBounds } from "@/utils/math-utils";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { mergeRefs } from "react-merge-refs";
import { useRecoilValue } from "recoil";
import { TeamBox } from "./TeamBox";

type Props = {
  id: number;
};

export const DraggableTeamBox = ({ id }: Props) => {
  const teamBox = useRecoilValue(teamBoxAtomFamily(id));

  const screen = CanvasStore.screen;
  const isInScreen = inBounds(teamBox, screen);

  const [_, teamMemberDropRef] = useTeamMemberDrop(id);

  const [{ isDragging }, teamDragRef, teamDragPreview] = useTeamDrag(id);

  useEffect(() => {
    teamDragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [teamDragPreview]);

  return isInScreen ? (
    <div
      className="absolute border-2 border-dashed rounded-3xl bg-dam-blue-100 border-dam-blue-400"
      style={{
        left: teamBox.x - screen.x,
        top: teamBox.y - screen.y,
        width: teamBox.width,
        height: teamBox.height,
        opacity: isDragging ? 0 : 1,
      }}
      ref={mergeRefs([teamDragRef, teamMemberDropRef])}
    >
      <TeamBox />
    </div>
  ) : null;
};
