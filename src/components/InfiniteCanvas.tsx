import { CanvasEdgesDropZone } from "@/components/CanvasEdgesDropZone";
import { CustomDragLayer } from "@/components/CustomDragLayer";
import ScaledContainer from "@/components/ScaledContainer";
import useRenderLoop from "@/core/RenderLoop";
import { useTeamDrop } from "@/hooks/team-dnd";
import { useTeamMemberDrop } from "@/hooks/team-members-dnd";
import CanvasStore from "@/state/CanvasStore";
import { isTeamMemberDraggingOverDropZoneAtomFamily } from "@/state/recoil/atoms/isTeamMemberDraggingOverDropZoneAtomFamily";
import { DropZone } from "@/utils/dnd";
import useSize from "@react-hook/size";
import {
  PointerEvent,
  useCallback,
  useEffect,
  useRef,
  WheelEvent,
} from "react";
import { mergeRefs } from "react-merge-refs";
import { useSetRecoilState } from "recoil";

const InfiniteCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(canvasRef);

  const setIsTeamMemberDraggingOverCanvas = useSetRecoilState(
    isTeamMemberDraggingOverDropZoneAtomFamily(DropZone.CANVAS)
  );

  useEffect(() => {
    if (width === 0 || height === 0) return;
    CanvasStore.initialize(width, height);
  }, [width, height]);

  const [_, teamDropRef] = useTeamDrop();

  const handleWheel = useCallback((event: WheelEvent) => {
    const { deltaX, deltaY } = event;

    // If the user is pressing the metaKey or the ctrlKey, they want to move the camera around.
    if (!event.metaKey && !event.ctrlKey) {
      CanvasStore.moveCamera(deltaX, deltaY);
    } else {
      CanvasStore.zoomCamera(deltaY);
    }
  }, []);

  const handlePointer = useCallback((event: PointerEvent) => {
    CanvasStore.movePointer(event.clientX, event.clientY);
  }, []);

  const frame = useRenderLoop(60);

  const [{ isOverCurrent }, teamMemberDropRef] = useTeamMemberDrop("NEW_TEAM");

  useEffect(() => {
    setIsTeamMemberDraggingOverCanvas(isOverCurrent);
  }, [isOverCurrent, setIsTeamMemberDraggingOverCanvas]);

  return (
    <div
      className="relative w-full h-full overflow-hidden border-2 border-dashed bg-dam-blue-400 bg-opacity-[15%] border-dam-blue-400 overscroll-none"
      ref={mergeRefs([canvasRef, teamDropRef, teamMemberDropRef])}
      onWheel={handleWheel}
      onPointerMove={handlePointer}
    >
      <CanvasEdgesDropZone />
      <CustomDragLayer />
      <ScaledContainer frame={frame} />
    </div>
  );
};

export default InfiniteCanvas;
