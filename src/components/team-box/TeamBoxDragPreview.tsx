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
    <div style={{ ...teamBoxSize }}>
      <TeamBox id={id} />
    </div>
  );
};
