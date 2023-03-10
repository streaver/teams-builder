import { DraggableTeamMemberAvatar } from "@/components/team-member/avatar/DraggableTeamMemberAvatar";
import { useTeamMemberDrop } from "@/hooks/team-members-dnd";
import { itemTypeBeingDraggedAtom } from "@/state/recoil/atoms/itemTypeBeingDraggedAtom";
import { teamMemberIdsSelectorFamily } from "@/state/recoil/selectors/teamMemberIdsSelectorFamily";
import { DraggableItemType } from "@/utils/dnd";
import classNames from "classnames";
import { useRecoilValue } from "recoil";

const Bench = () => {
  const membersIds = useRecoilValue(teamMemberIdsSelectorFamily(null));
  const itemTypeBeingDragged = useRecoilValue(itemTypeBeingDraggedAtom);

  const isTeamMemberBeingDragged =
    itemTypeBeingDragged === DraggableItemType.TEAM_MEMBER_AVATAR;

  const [_, teamMemberDropRef] = useTeamMemberDrop(null);

  return (
    <div
      ref={teamMemberDropRef}
      className={classNames(
        "fixed z-30 bottom-0 left-0 flex gap-4 w-3/5 min-h-[96px] max-h-[192px] items-center p-4 flex-wrap overflow-y-auto rounded-3xl",
        {
          "bg-gradient-to-r from-dam-blue-400/50 to-transparent":
            isTeamMemberBeingDragged,
        }
      )}
    >
      {membersIds.map((id) => (
        <DraggableTeamMemberAvatar key={id} id={id} />
      ))}
    </div>
  );
};

export default Bench;
