import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import { Team, TeamMember } from "@/types/Team";
import { DraggableItemType } from "@/utils/dnd";
import { calculateTeamBoxHeight } from "@/utils/teams-utils";
import { useDrag, useDrop } from "react-dnd";
import { useRecoilCallback } from "recoil";

export type TeamMemberDndItem = {
  id: TeamMember["id"];
};

export type TeamMemberDndCollectedProps = {
  isDragging: boolean;
};

export const useTeamMemberDrag = (id: TeamMember["id"]) => {
  return useDrag<TeamMemberDndItem, unknown, TeamMemberDndCollectedProps>(
    () => ({
      type: DraggableItemType.TEAM_MEMBER_AVATAR,
      item: {
        id,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id]
  );
};

export const useTeamMemberDrop = (teamId: Team["id"] | null) => {
  const updateTeamMember = useRecoilCallback(
    ({ snapshot, set }) =>
      async (teamMemberId: TeamMember["id"]) => {
        const memberPicked = await snapshot.getPromise(
          teamMemberAtomFamily(teamMemberId)
        );

        if (memberPicked.teamId !== teamId) {
          // Update the box height of the selected member's new team.
          if (teamId !== null) {
            const dropTeamMembersSnapshot = await snapshot.getPromise(
              teamMembersSelectorFamily(teamId)
            );

            const dropTeamMembers = [...dropTeamMembersSnapshot];
            dropTeamMembers.push(memberPicked);

            const dropTeamBoxtotalHeight =
              calculateTeamBoxHeight(dropTeamMembers);

            set(teamBoxAtomFamily(teamId), (currentData) => ({
              ...currentData,
              height: dropTeamBoxtotalHeight,
            }));
          }

          // Update the box height of the selected member's old team.
          if (memberPicked.teamId !== null) {
            const dragTeamMembersSnapshot = await snapshot.getPromise(
              teamMembersSelectorFamily(memberPicked.teamId)
            );

            const dragTeamMembers = dragTeamMembersSnapshot.filter(
              (member: TeamMember) => member.id !== teamMemberId
            );

            const dragTeamBoxtotalHeight =
              calculateTeamBoxHeight(dragTeamMembers);

            set(teamBoxAtomFamily(memberPicked.teamId), (currentData) => ({
              ...currentData,
              height: dragTeamBoxtotalHeight,
            }));
          }
        }

        set(teamMemberAtomFamily(teamMemberId), (member) => ({
          ...member,
          teamId,
        }));
      },
    [teamId]
  );

  return useDrop<TeamMemberDndItem>(
    () => ({
      accept: DraggableItemType.TEAM_MEMBER_AVATAR,
      drop: (item) => {
        updateTeamMember(item.id);
      },
    }),
    [updateTeamMember]
  );
};
