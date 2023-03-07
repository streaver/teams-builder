import { TeamBoxDndItem, TEAM_BOX } from "@/hooks/team-dnd";
import classNames from "classnames";
import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import { useDrop } from "react-dnd";

const EDGE_SIZE_IN_PIXELS = 80;

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
      accept: TEAM_BOX,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [onHover]
  );

  useEffect(() => {
    onHover(isOver);
  }, [onHover, isOver, edge]);

  return (
    <div
      ref={dropRef}
      className={classNames("absolute z-50")}
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
