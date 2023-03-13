import { TeamBox } from "@/components/team-box/TeamBox";
import { useTeamDrag } from "@/hooks/team-dnd";
import { useTeamMemberDrop } from "@/hooks/team-members-dnd";
import CanvasStore from "@/state/CanvasStore";
import { isTeamMemberDraggingOverDropZoneAtomFamily } from "@/state/recoil/atoms/isTeamMemberDraggingOverDropZoneAtomFamily";
import { teamAtomFamily } from "@/state/recoil/atoms/teamAtomFamily";
import { teamBoxPositionAtomFamily } from "@/state/recoil/atoms/teamBoxPositionAtomFamily";
import { clientColorSelectorFamily } from "@/state/recoil/selectors/clientColorSelectorFamily";
import { teamBoxSizeSelectorFamily } from "@/state/recoil/selectors/teamBoxSizeSelectorFamily";
import { DropZone } from "@/utils/dnd";
import { inBounds } from "@/utils/math-utils";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { mergeRefs } from "react-merge-refs";
import { constSelector, useRecoilValue, useSetRecoilState } from "recoil";

type Props = {
  id: number;
};

export const DraggableTeamBox = ({ id }: Props) => {
  const teamBoxPosition = useRecoilValue(teamBoxPositionAtomFamily(id));
  const teamBoxSize = useRecoilValue(teamBoxSizeSelectorFamily(id));
  const team = useRecoilValue(teamAtomFamily(id));
  const teamColor = useRecoilValue(
    team.clientId !== null
      ? clientColorSelectorFamily(team.clientId)
      : constSelector(null)
  );

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
      className="absolute border-2 border-dashed rounded-3xl  bg-opacity-[15%] border-dam-blue-400"
      style={{
        left: teamBoxPosition.x - screen.x,
        top: teamBoxPosition.y - screen.y,
        ...teamBoxSize,
        backgroundColor: teamColor || "transparent",
        opacity: isDragging ? 0 : 1,
      }}
      ref={mergeRefs([teamDragRef, teamMemberDropRef])}
    >
      <TeamBox id={id} />
    </div>
  ) : null;
};
