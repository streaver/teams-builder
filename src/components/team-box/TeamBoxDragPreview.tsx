import { TeamBox } from "@/components/team-box/TeamBox";
import { teamBoxSizeSelectorFamily } from "@/state/recoil/selectors/teamBoxSizeSelectorFamily";
import { Team } from "@/types/Team";
import { useRecoilValue } from "recoil";

type Props = {
  id: Team["id"];
};

export const TeamBoxDragPreview = ({ id }: Props) => {
  const teamBoxSize = useRecoilValue(teamBoxSizeSelectorFamily(id));

  return (
    <div
      className="relative bg-purple-100 border-2 border-purple-400 border-dashed rounded-3xl"
      style={{ ...teamBoxSize }}
    >
      <TeamBox id={id} />
    </div>
  );
};
