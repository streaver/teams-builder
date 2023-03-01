import CanvasStore from "@/state/CanvasStore";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamMemberIdsSelectorFamily } from "@/state/recoil/selectors/teamMemberIdsSelectorFamily";
import { TEAM_PADDING } from "@/utils/constants";
import { inBounds } from "@/utils/math-utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { TeamMemberBox } from "./TeamMemberBox";

type Props = {
  id: number;
};

export const TeamBox = ({ id }: Props) => {
  const [teamBox, setTeamBox] = useRecoilState(teamBoxAtomFamily(id));
  const teamMemberIds = useRecoilValue(teamMemberIdsSelectorFamily(id));

  const screen = CanvasStore.screen;
  const isInScreen = inBounds(teamBox, screen);

  return isInScreen ? (
    <div
      className="absolute flex flex-wrap gap-2 border-2 border-dashed rounded-3xl bg-dam-blue-100 border-dam-blue-400"
      style={{
        left: teamBox.x - screen.x,
        top: teamBox.y - screen.y,
        width: teamBox.width,
        height: teamBox.height,
        padding: TEAM_PADDING,
      }}
    >
      {teamMemberIds.map((teamMemberId) => (
        <TeamMemberBox key={teamMemberId} id={teamMemberId} />
      ))}
    </div>
  ) : null;
};
