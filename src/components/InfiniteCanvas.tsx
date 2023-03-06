import { useTeamDrop } from "@/hooks/team-dnd";
import useSize from "@react-hook/size";
import {
  PointerEvent,
  useCallback,
  useEffect,
  useRef,
  WheelEvent,
} from "react";
import { mergeRefs } from "react-merge-refs";
import useRenderLoop from "../core/RenderLoop";
import CanvasStore from "../state/CanvasStore";
import ScaledContainer from "./ScaledContainer";

const InfiniteCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(canvasRef);

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

  return (
    <div
      className="relative w-full h-full overflow-hidden border-2 border-dashed bg-dam-blue-100 border-dam-blue-400 overscroll-none"
      ref={mergeRefs([canvasRef, teamDropRef])}
      onWheel={handleWheel}
      onPointerMove={handlePointer}
    >
      <ScaledContainer frame={frame} />
    </div>
  );
};

export default InfiniteCanvas;
