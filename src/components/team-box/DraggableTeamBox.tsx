import { TeamBox } from "@/components/team-box/TeamBox";
import { useTeamDrag } from "@/hooks/team-dnd";
import { useTeamMemberDrop } from "@/hooks/team-members-dnd";
import CanvasStore from "@/state/CanvasStore";
import { isTeamMemberDraggingOverDropZoneAtomFamily } from "@/state/recoil/atoms/isTeamMemberDraggingOverDropZoneAtomFamily";
import { teamBoxPositionAtomFamily } from "@/state/recoil/atoms/teamBoxPositionAtomFamily";
import { teamBoxSizeSelectorFamily } from "@/state/recoil/selectors/teamBoxSizeSelectorFamily";
import { teamColorSelectorFamily } from "@/state/recoil/selectors/teamColorSelectorFamily";
import { DropZone } from "@/utils/dnd";
import { inBounds } from "@/utils/math-utils";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { mergeRefs } from "react-merge-refs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import tinycolor from "tinycolor2";

type Props = {
  id: number;
};

export const DraggableTeamBox = ({ id }: Props) => {
  const teamBoxPosition = useRecoilValue(teamBoxPositionAtomFamily(id));
  const teamBoxSize = useRecoilValue(teamBoxSizeSelectorFamily(id));
  const teamColor = useRecoilValue(teamColorSelectorFamily(id));
  const teamColorWithTransparency = tinycolor(teamColor)
    .setAlpha(0.15)
    .toRgbString();

  const setIsTeamMemberBeingDraggedOverTeam = useSetRecoilState(
    isTeamMemberDraggingOverDropZoneAtomFamily(DropZone.TEAM_BOX)
  );

  const screen = CanvasStore.screen;
  const isInScreen = inBounds({ ...teamBoxPosition, ...teamBoxSize }, screen);

  const [{ isOverCurrent: isOverTeamBox }, teamMemberDropRef] =
    useTeamMemberDrop(id);

  const [{ isDragging }, teamDragRef, teamDragPreview] = useTeamDrag(id);

  useEffect(() => {
    teamDragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [teamDragPreview]);

  useEffect(() => {
    setIsTeamMemberBeingDraggedOverTeam(isOverTeamBox);
  }, [isOverTeamBox, setIsTeamMemberBeingDraggedOverTeam]);

  return isInScreen ? (
    <div
      className="absolute border-2 border-dashed rounded-3xl"
      style={{
        left: teamBoxPosition.x - screen.x,
        top: teamBoxPosition.y - screen.y,
        ...teamBoxSize,
        backgroundColor: teamColorWithTransparency,
        borderColor: teamColor,
        opacity: isDragging ? 0 : 1,
      }}
      ref={mergeRefs([teamDragRef, teamMemberDropRef])}
    >
      <TeamBox id={id} />
    </div>
  ) : null;
};
