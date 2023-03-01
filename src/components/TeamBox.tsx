import CanvasStore from "@/state/CanvasStore";
import { teamAtomFamily } from "@/state/recoil/atoms/teamAtomFamily";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamMemberIdsSelectorFamily } from "@/state/recoil/selectors/teamMemberIdsSelectorFamily";
import { TEAM_PADDING } from "@/utils/constants";
import { inBounds } from "@/utils/math-utils";
import { useRecoilValue } from "recoil";
import { TeamMemberBox } from "./TeamMemberBox";

type Props = {
  id: number;
};

export const TeamBox = ({ id }: Props) => {
  const teamBox = useRecoilValue(teamBoxAtomFamily(id));
  const team = useRecoilValue(teamAtomFamily(id));

  const teamMemberIds = useRecoilValue(teamMemberIdsSelectorFamily(id));

  const screen = CanvasStore.screen;
  const isInScreen = inBounds(teamBox, screen);

  return isInScreen ? (
    <div
      className="absolute border-2 border-dashed rounded-3xl bg-dam-blue-100 border-dam-blue-400"
      style={{
        left: teamBox.x - screen.x,
        top: teamBox.y - screen.y,
        width: teamBox.width,
        height: teamBox.height,
      }}
    >
      <div
        className="relative flex flex-wrap h-full gap-2"
        style={{ padding: TEAM_PADDING }}
      >
        {teamMemberIds.map((teamMemberId) => (
          <TeamMemberBox key={teamMemberId} id={teamMemberId} />
        ))}
      </div>
      <span className="absolute -translate-x-1/2 left-1/2 -bottom-8">
        {team.name}
      </span>
    </div>
  ) : null;
};
