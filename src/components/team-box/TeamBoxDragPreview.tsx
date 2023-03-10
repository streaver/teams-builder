import { TeamBox } from "@/components/team-box/TeamBox";
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
      className="relative border-2 border-dashed bg-dam-blue-400 bg-opacity-[15%] border-dam-blue-400 rounded-3xl"
      style={{
        width: teamBox.width,
        height: teamBox.height,
      }}
    >
      <TeamBox id={id} />
    </div>
  );
};
