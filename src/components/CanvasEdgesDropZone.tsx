import { TeamBoxDndItem } from "@/hooks/team-dnd";
import CanvasStore from "@/state/CanvasStore";
import { DraggableItemType } from "@/utils/dnd";
import {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrop } from "react-dnd";

const CAMERA_STEP_ON_DRAG = 5;
const EDGE_SIZE_IN_PIXELS = 40;

type Edge =
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "top-left";

type Props = {
  edge: Edge;
  onHover: (isOver: boolean) => void;
};

const EDGE_DROP_ZONE_STYLES: Record<Edge, CSSProperties> = {
  top: {
    top: 0,
    left: EDGE_SIZE_IN_PIXELS,
    right: EDGE_SIZE_IN_PIXELS,
    height: EDGE_SIZE_IN_PIXELS,
  },
  "top-right": {
    top: 0,
    right: 0,
    height: EDGE_SIZE_IN_PIXELS,
    width: EDGE_SIZE_IN_PIXELS,
  },
  right: {
    top: EDGE_SIZE_IN_PIXELS,
    right: 0,
    bottom: EDGE_SIZE_IN_PIXELS,
    width: EDGE_SIZE_IN_PIXELS,
  },
  "bottom-right": {
    bottom: 0,
    right: 0,
    height: EDGE_SIZE_IN_PIXELS,
    width: EDGE_SIZE_IN_PIXELS,
  },
  bottom: {
    bottom: 0,
    left: EDGE_SIZE_IN_PIXELS,
    right: EDGE_SIZE_IN_PIXELS,
    height: EDGE_SIZE_IN_PIXELS,
  },
  "bottom-left": {
    bottom: 0,
    left: 0,
    height: EDGE_SIZE_IN_PIXELS,
    width: EDGE_SIZE_IN_PIXELS,
  },
  left: {
    top: EDGE_SIZE_IN_PIXELS,
    left: 0,
    bottom: EDGE_SIZE_IN_PIXELS,
    width: EDGE_SIZE_IN_PIXELS,
  },
  "top-left": {
    top: 0,
    left: 0,
    height: EDGE_SIZE_IN_PIXELS,
    width: EDGE_SIZE_IN_PIXELS,
  },
};

export const EdgeDropZone = ({
  edge,
  onHover,
  children,
}: PropsWithChildren<Props>) => {
  const [{ isOver }, dropRef] = useDrop<
    TeamBoxDndItem,
    unknown,
    { isOver: boolean }
  >(
    () => ({
      accept: DraggableItemType.TEAM_BOX,
      canDrop: () => false, // By making canDrop return false we make sure the drop event will propagate upwards (to the canvas)
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    []
  );

  useEffect(() => {
    onHover(isOver);
  }, [onHover, isOver, edge]);

  return (
    <div
      ref={dropRef}
      className={"absolute z-50"}
      style={EDGE_DROP_ZONE_STYLES[edge]}
    >
      {children}
    </div>
  );
};

export const CanvasEdgesDropZone = () => {
  const [isOverTop, seetIsOverTop] = useState(false);
  const [isOverTopRigh, setIsOverTopRigh] = useState(false);
  const [isOverRight, setIsOverRight] = useState(false);
  const [isOverBottomRigh, setIsOverBottomRigh] = useState(false);
  const [isOverBottom, setIsOverBottom] = useState(false);
  const [isOverBottomLeft, setIsOverBottomLeft] = useState(false);
  const [isOverLeft, setIsOverLeft] = useState(false);
  const [isOverTopLeft, setIsOverTopLeft] = useState(false);

  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (
      !isOverTop &&
      !isOverTopRigh &&
      !isOverRight &&
      !isOverBottomRigh &&
      !isOverBottom &&
      !isOverBottomLeft &&
      !isOverLeft &&
      !isOverTopLeft
    ) {
      return;
    }

    const isTop = isOverTop || isOverTopRigh || isOverTopLeft;
    const isRight = isOverRight || isOverTopRigh || isOverBottomRigh;
    const isBottom = isOverBottom || isOverBottomRigh || isOverBottomLeft;
    const isLeft = isOverLeft || isOverBottomLeft || isOverTopLeft;

    const xDelta = isRight
      ? CAMERA_STEP_ON_DRAG
      : isLeft
      ? -CAMERA_STEP_ON_DRAG
      : 0;
    const yDelta = isBottom
      ? CAMERA_STEP_ON_DRAG
      : isTop
      ? -CAMERA_STEP_ON_DRAG
      : 0;

    const moveCamera = () => {
      CanvasStore.moveCamera(xDelta, yDelta);
      animationFrameRef.current = window.requestAnimationFrame(moveCamera);
    };

    animationFrameRef.current = window.requestAnimationFrame(moveCamera);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    isOverBottom,
    isOverBottomLeft,
    isOverBottomRigh,
    isOverLeft,
    isOverRight,
    isOverTop,
    isOverTopLeft,
    isOverTopRigh,
  ]);

  return (
    <>
      <EdgeDropZone edge="top" onHover={seetIsOverTop} />
      <EdgeDropZone edge="top-right" onHover={setIsOverTopRigh} />
      <EdgeDropZone edge="right" onHover={setIsOverRight} />
      <EdgeDropZone edge="bottom-right" onHover={setIsOverBottomRigh} />
      <EdgeDropZone edge="bottom" onHover={setIsOverBottom} />
      <EdgeDropZone edge="bottom-left" onHover={setIsOverBottomLeft} />
      <EdgeDropZone edge="left" onHover={setIsOverLeft} />
      <EdgeDropZone edge="top-left" onHover={setIsOverTopLeft} />
    </>
  );
};
