import { memo } from "react";
import CanvasStore from "../state/CanvasStore";

const ScaledContainer = () => {
  const scale = CanvasStore.scale;

  return (
    <div
      className="w-full h-full"
      style={{
        transform: `scale(${(scale.x, scale.y)})`,
        transformOrigin: "top left",
      }}
    ></div>
  );
};

export default memo(ScaledContainer);
