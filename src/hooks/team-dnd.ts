import CanvasStore from "@/state/CanvasStore";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { Team } from "@/types/Team";
import { applyReverseScale } from "@/utils/math-utils";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useRecoilCallback } from "recoil";

export const TEAM_BOX = "team_box";

export type TeamBoxDndItem = {
  teamId: Team["id"];
  screen: typeof CanvasStore.screen;
};

export type TeamBoxDndCollectedProps = {
  isDragging: boolean;
};

export const useTeamDrag = (teamId: Team["id"]) => {
  return useDrag<TeamBoxDndItem, unknown, TeamBoxDndCollectedProps>(
    () => ({
      type: TEAM_BOX,
      item: {
        teamId,
        // The camera might move during the drag operation.
        // If that happens, the original position of the camera will be needed to compute the right position.
        screen: CanvasStore.screen,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [teamId, CanvasStore.screen]
  );
};

export const useTeamDrop = () => {
  const handleTeamDrop = useRecoilCallback(
    ({ set }) =>
      (teamId: Team["id"], delta: XYCoord) => {
        set(teamBoxAtomFamily(teamId), (teamBox) => ({
          ...teamBox,
          ...{
            x: teamBox.x + delta.x,
            y: teamBox.y + delta.y,
          },
        }));
      },
    []
  );

  return useDrop<TeamBoxDndItem>(
    () => ({
      accept: TEAM_BOX,
      drop: (item, monitor) => {
        let delta = monitor.getDifferenceFromInitialOffset();
        if (!delta) {
          return;
        }

        const screen = CanvasStore.screen;
        const canvasScale = CanvasStore.scale;

        // The canvas might be scaled
        // The delta needs to be corrected using the canva's scale
        delta = applyReverseScale(delta, canvasScale);

        // The camera might have been moved during the drag
        // The delta needs to be corrected with the new screen's position
        delta.x += screen.x - item.screen.x;
        delta.y += screen.y - item.screen.y;

        handleTeamDrop(item.teamId, delta);
      },
    }),
    [handleTeamDrop]
  );
};
