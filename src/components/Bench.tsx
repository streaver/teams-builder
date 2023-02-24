import { teamMemberIdsSelectorFamily } from "@/state/recoil/selectors/teamMemberIdsSelectorFamily";
import { useRecoilValue } from "recoil";
import { TeamBoxWrapper } from "./TeamBoxWrapper";
import { TeamMemberAvatar } from "./TeamMemberAvatar";

export const Bench = () => {
  const benchedTeamMemberIds = useRecoilValue(
    teamMemberIdsSelectorFamily(null)
  );

  return (
    <TeamBoxWrapper id={null}>
      <div className="fixed bottom-0 left-0 flex gap-4 bg-blue-200 min-h-[96px] w-1/2 p-4 items-center">
        {benchedTeamMemberIds.map((id) => (
          <TeamMemberAvatar key={id} id={id} />
        ))}
      </div>
    </TeamBoxWrapper>
  );
};
