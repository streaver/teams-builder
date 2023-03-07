import { DraggableTeamMemberAvatar } from "@/components/DraggableTeamMemberAvatar";
import { useTeamMemberDrop } from "@/hooks/team-members-dnd";
import { teamMemberIdsSelectorFamily } from "@/state/recoil/selectors/teamMemberIdsSelectorFamily";
import { useRecoilValue } from "recoil";

export const Bench = () => {
  const membersIds = useRecoilValue(teamMemberIdsSelectorFamily(null));

  const [_, teamMemberDropRef] = useTeamMemberDrop(null);

  return (
    <div
      ref={teamMemberDropRef}
      className="fixed bottom-0 left-0 flex gap-4 w-3/5 min-h-[96px] max-h-[192px] items-center p-4 flex-wrap overflow-y-auto hover:bg-gradient-to-r "
    >
      {membersIds.map((id) => (
        <DraggableTeamMemberAvatar key={id} id={id} />
      ))}
    </div>
  );
};
