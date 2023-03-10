import { TeamBox } from "@/components/team-box/TeamBox";
import { useTeamDrag } from "@/hooks/team-dnd";
import { useTeamMemberDrop } from "@/hooks/team-members-dnd";
import CanvasStore from "@/state/CanvasStore";
import { isTeamMemberDraggingOverDropZoneAtomFamily } from "@/state/recoil/atoms/isTeamMemberDraggingOverDropZoneAtomFamily";
<<<<<<< HEAD
import { teamAtomFamily } from "@/state/recoil/atoms/teamAtomFamily";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { clientColorSelectorFamily } from "@/state/recoil/selectors/clientColorSelectorFamily";
=======
import { teamBoxPositionAtomFamily } from "@/state/recoil/atoms/teamBoxPositionAtomFamily";
>>>>>>> 621eebc (Renamed the teamBoxAtom since now it only contains the position of the box. Also simplified the initial position of the teams (though they might overlap for now))
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
<<<<<<< HEAD
  const teamBox = useRecoilValue(teamBoxAtomFamily(id));
  const team = useRecoilValue(teamAtomFamily(id));
  const teamColor = useRecoilValue(
    team.clientId !== null
      ? clientColorSelectorFamily(team.clientId)
      : constSelector(null)
  );
=======
  const teamBox = useRecoilValue(teamBoxPositionAtomFamily(id));
>>>>>>> 621eebc (Renamed the teamBoxAtom since now it only contains the position of the box. Also simplified the initial position of the teams (though they might overlap for now))

  const setIsTeamMemberBeingDraggedOverTeam = useSetRecoilState(
    isTeamMemberDraggingOverDropZoneAtomFamily(DropZone.TEAM_BOX)
  );

  const screen = CanvasStore.screen;
  const isInScreen = inBounds(teamBox, screen);

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
        left: teamBox.x - screen.x,
        top: teamBox.y - screen.y,
        width: teamBox.width,
        height: teamBox.height,
        backgroundColor: teamColor || "transparent",
        opacity: isDragging ? 0 : 1,
      }}
      ref={mergeRefs([teamDragRef, teamMemberDropRef])}
    >
      <TeamBox id={id} />
    </div>
  ) : null;
};
