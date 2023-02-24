import CanvasStore from "@/state/CanvasStore";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamMemberIdsSelectorFamily } from "@/state/recoil/selectors/teamMemberIdsSelectorFamily";
import { inBounds } from "@/utils/math-utils";
import { useRecoilValue } from "recoil";
import { TeamBoxWrapper } from "./TeamBoxWrapper";
import { TeamMemberAvatar } from "./TeamMemberAvatar";

type Props = {
  id: number;
};

export const TeamBox = ({ id }: Props) => {
  const teamBox = useRecoilValue(teamBoxAtomFamily(id));
  const teamMemberIds = useRecoilValue(teamMemberIdsSelectorFamily(id));

  const screen = CanvasStore.screen;
  const isInScreen = inBounds(teamBox, screen);

  return isInScreen ? (
    <TeamBoxWrapper id={id}>
      <div
        className="absolute bg-white border-2 border-purple-300 border-dashed rounded-lg"
        style={{
          left: teamBox.x - screen.x,
          top: teamBox.y - screen.y,
          width: teamBox.width,
          height: teamBox.height,
        }}
      >
        {teamMemberIds.map((teamMemberId) => (
          <TeamMemberAvatar key={teamMemberId} id={teamMemberId} />
        ))}
      </div>
    </TeamBoxWrapper>
  ) : null;
};
