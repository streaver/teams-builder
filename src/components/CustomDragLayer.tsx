import { TeamBoxDragPreview } from "@/components/team-box/TeamBoxDragPreview";
import { TeamMemberDragPreview } from "@/components/team-member/TeamMemberDragPreview";
import { TeamBoxDndItem } from "@/hooks/team-dnd";
import { TeamMemberDndItem } from "@/hooks/team-members-dnd";
import CanvasStore from "@/state/CanvasStore";
import { itemTypeBeingDraggedAtom } from "@/state/recoil/atoms/itemTypeBeingDraggedAtom";
import { DraggableItemType } from "@/utils/dnd";
import { applyReverseScale } from "@/utils/math-utils";
import { useEffect } from "react";
import { useDragLayer } from "react-dnd";
import { useSetRecoilState } from "recoil";

export const CustomDragLayer = () => {
  const setItemTypeBeingDragged = useSetRecoilState(itemTypeBeingDraggedAtom);

  const { itemType, isDragging, item, initialPosition, delta } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType() as DraggableItemType,
      initialPosition: monitor.getInitialSourceClientOffset(),
      delta: monitor.getDifferenceFromInitialOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  // When an item is being dragged, stores the item's type, otherwise stores null.
  useEffect(() => {
    setItemTypeBeingDragged(isDragging ? itemType : null);
  }, [isDragging, itemType, setItemTypeBeingDragged]);

  if (!isDragging || !delta || !initialPosition) {
    return null;
  }

  const renderItem = () => {
    switch (itemType) {
      case DraggableItemType.TEAM_BOX:
        const teamId = (item as TeamBoxDndItem).teamId;
        return <TeamBoxDragPreview id={teamId} />;

      case DraggableItemType.TEAM_MEMBER_AVATAR:
        const memberId = (item as TeamMemberDndItem).id;
        return <TeamMemberDragPreview id={memberId} />;

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
