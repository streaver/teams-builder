import { teamMemberIdsSelectorFamily } from "@/state/recoil/selectors/teamMemberIdsSelectorFamily";
import { useRecoilValue } from "recoil";
import { TeamMemberAvatar } from "./TeamMemberAvatar";
import { TeamBoxWrapper } from "./TeamBoxWrapper";

export const Bench = () => {
  const membersIds = useRecoilValue(teamMemberIdsSelectorFamily(null));

  return (
    <TeamBoxWrapper id={null}>
      <div className="fixed bottom-0 left-0 flex gap-4 w-3/5 min-h-[96px] max-h-[192px] items-center p-4 flex-wrap overflow-y-auto hover:bg-gradient-to-r ">
        {membersIds.map((id) => (
          <TeamMemberAvatar key={id} id={id} />
        ))}
      </div>
    </TeamBoxWrapper>
  );
};
