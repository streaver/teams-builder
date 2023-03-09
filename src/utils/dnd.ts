import CanvasStore from "@/state/CanvasStore";
import { XYCoord } from "react-dnd";
import { applyReverseScale } from "./math-utils";

export enum DraggableItemType {
  TEAM_MEMBER_AVATAR = "team_member_avatar",
  TEAM_BOX = "team_box",
}

export enum DropZone {
  CANVAS = "canvas",
  TEAM_BOX = "team_box",
  CANVAS_EDGE = "canvas_edge",
}

export const getPositionAfterDrop = ({
  initialPosition,
  delta,
  scale,
  screen,
}: {
  initialPosition: XYCoord;
  delta: XYCoord;
  scale: XYCoord;
  screen: typeof CanvasStore.screen;
}) => {
  const position = applyReverseScale(
    {
      x: initialPosition.x + delta.x,
      y: initialPosition.y + delta.y,
    },
    scale
  );

  position.x += screen.x;
  position.y += screen.y;

  return position;
};
