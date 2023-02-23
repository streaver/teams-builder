import { teamIdsAtom } from "@/state/recoil/atoms/teamIdsAtom";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import CanvasStore from "../state/CanvasStore";
import { TeamBox } from "./TeamBox";

type Props = {
  frame: string;
};

const ScaledContainer = ({ frame }: Props) => {
  const scale = CanvasStore.scale;

  const teamIds = useRecoilValue(teamIdsAtom);

  return (
    <div
      className="w-full h-full"
      style={{
        transform: `scale(${(scale.x, scale.y)})`,
        transformOrigin: "top left",
      }}
    >
      {teamIds.map((teamId) => (
        <TeamBox key={teamId} id={teamId} />
      ))}
    </div>
  );
};

export default memo(ScaledContainer);
