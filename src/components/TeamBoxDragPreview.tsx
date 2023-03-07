import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { Team } from "@/types/Team";
import { useRecoilValue } from "recoil";

type Props = {
  id: Team["id"];
};

export const TeamBoxDragPreview = ({ id }: Props) => {
  const teamBox = useRecoilValue(teamBoxAtomFamily(id));

  return (
    <div
      className="bg-purple-100 border-2 border-purple-400 border-dashed rounded-3xl"
      style={{
        width: teamBox.width,
        height: teamBox.height,
      }}
    />
  );
};
