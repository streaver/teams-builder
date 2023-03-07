import { TeamBoxDndItem, TEAM_BOX } from "@/hooks/team-dnd";
import {
  TeamMemberDndItem,
  TEAM_MEMBER_AVATAR,
} from "@/hooks/team-members-dnd";
import CanvasStore from "@/state/CanvasStore";
import { applyReverseScale } from "@/utils/math-utils";
import { useDragLayer } from "react-dnd";
import { TeamBoxDragPreview } from "./TeamBoxDragPreview";
import { TeamMemberAvatarDragPreview } from "./TeamMemberAvatarDragPreview";

export const CustomDragLayer = () => {
  const { itemType, isDragging, item, initialPosition, delta } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialPosition: monitor.getInitialSourceClientOffset(),
      delta: monitor.getDifferenceFromInitialOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  if (!isDragging || !delta || !initialPosition) {
    return null;
  }

  const renderItem = () => {
    switch (itemType) {
      case TEAM_BOX:
        const teamId = (item as TeamBoxDndItem).teamId;
        return <TeamBoxDragPreview id={teamId} />;

      case TEAM_MEMBER_AVATAR:
        const memberId = (item as TeamMemberDndItem).id;
        return <TeamMemberAvatarDragPreview id={memberId} />;

      default:
        return null;
    }
  };

  const canvasScale = CanvasStore.scale;

  let newPosition = applyReverseScale(
    {
      x: initialPosition.x + delta.x,
      y: initialPosition.y + delta.y,
    },
    canvasScale
  );

  return (
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 100 }}
    >
      <div
        style={{
          scale: `${canvasScale.x} ${canvasScale.y}`,
          transform: `translate(${newPosition.x}px, ${newPosition.y}px)`,
          transformOrigin: "top left",
        }}
      >
        {renderItem()}
      </div>
    </div>
  );
};
