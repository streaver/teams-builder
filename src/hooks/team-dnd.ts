import CanvasStore from "@/state/CanvasStore";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { Team } from "@/types/Team";
import { applyReverseScale } from "@/utils/math-utils";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useRecoilCallback } from "recoil";

export const TEAM_BOX = "team_box";

export type TeamBoxDndItem = {
  teamId: Team["id"];
};

export const useTeamDrag = (teamId: Team["id"]) => {
  return useDrag<TeamBoxDndItem>(() => ({
    type: TEAM_BOX,
    item: {
      teamId,
    },
  }));
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
        const delta = monitor.getDifferenceFromInitialOffset();
        if (!delta) {
          return;
        }

        // The position delta needs to be corrected using the canvas scale
        const canvasScale = CanvasStore.scale;
        const scaledDelta = applyReverseScale(delta, canvasScale);

        handleTeamDrop(item.teamId, scaledDelta);
      },
    }),
    []
  );
};
