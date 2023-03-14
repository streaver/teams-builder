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
import { PointerEvent, useCallback, useEffect, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import { useSetRecoilState } from "recoil";

const InfiniteCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(canvasRef);

  const setIsTeamMemberDraggingOverCanvas = useSetRecoilState(
    isTeamMemberDraggingOverDropZoneAtomFamily(DropZone.CANVAS)
  );

  // Measures the width & height of the canvas and initializes the CanvasStore.
  // Note: If the screen is resized, then the CanvasStore will reset.
  useEffect(() => {
    if (width === 0 || height === 0) return;
    CanvasStore.initialize(width, height);
  }, [width, height]);

  // Listents to the wheel event on the canvas to move/zoom the camera.
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      const handleWheel: EventListener = (e) => {
        const event = e as WheelEvent;

        // Prevent the default zoom effect in case the user "pinches" the trackpad
        event.preventDefault();

        const { deltaX, deltaY } = event;

        // If the user is pressing the metaKey or the ctrlKey, they want to move the camera around.
        // Note: When the user "pinches" the trackpad, the ctrlKey flag will be true.
        if (!event.metaKey && !event.ctrlKey) {
          CanvasStore.moveCamera(deltaX, deltaY);
        } else {
          CanvasStore.zoomCamera(deltaY);
        }
      };

      // The event needs to be treated as a non-passive one so it's default behavior can be prevented.
      canvas.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        canvas.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  const [_, teamDropRef] = useTeamDrop();

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
      className="relative w-full h-full overflow-hidden border-2 border-dashed bg-dam-blue-400 bg-opacity-[15%] border-dam-blue-400 overscroll-none rounded-3xl"
      ref={mergeRefs([canvasRef, teamDropRef, teamMemberDropRef])}
      onPointerMove={handlePointer}
    >
      <CanvasEdgesDropZone />
      <CustomDragLayer />
      <ScaledContainer frame={frame} />
    </div>
  );
};

export default InfiniteCanvas;
