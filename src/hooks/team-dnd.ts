import CanvasStore from "@/state/CanvasStore";
import { teamBoxPositionAtomFamily } from "@/state/recoil/atoms/teamBoxPositionAtomFamily";
import { Team } from "@/types/Team";
import { DraggableItemType, getPositionAfterDrop } from "@/utils/dnd";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useRecoilCallback } from "recoil";

export type TeamBoxDndItem = {
  teamId: Team["id"];
};

type TeamBoxDragCollectedProps = {
  isDragging: boolean;
};

type TeamBoxDropCollectedProps = {};

export const useTeamDrag = (teamId: Team["id"]) => {
  return useDrag<TeamBoxDndItem, unknown, TeamBoxDragCollectedProps>(
    () => ({
      type: DraggableItemType.TEAM_BOX,
      item: {
        teamId,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [teamId]
  );
};

export const useTeamDrop = () => {
  const handleTeamDrop = useRecoilCallback(
    ({ set }) =>
      (teamId: Team["id"], position: XYCoord) => {
        set(teamBoxPositionAtomFamily(teamId), position);
      },
    []
  );

  return useDrop<TeamBoxDndItem, unknown, TeamBoxDropCollectedProps>(
    () => ({
      accept: DraggableItemType.TEAM_BOX,
      drop: (item, monitor) => {
        let initialPosition = monitor.getInitialSourceClientOffset();
        let delta = monitor.getDifferenceFromInitialOffset();

        if (!delta || !initialPosition) {
          return;
        }

        const position = getPositionAfterDrop({
          initialPosition,
          delta,
          scale: CanvasStore.scale,
          screen: CanvasStore.screen,
        });

        handleTeamDrop(item.teamId, position);
      },
    }),

    [handleTeamDrop]
  );
};
