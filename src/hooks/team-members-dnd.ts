import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import { Team, TeamMember } from "@/types/Team";
import { DraggableItemType } from "@/utils/dnd";
import { randomTeamId } from "@/utils/team-utils";
import { calculateTeamBoxHeight } from "@/utils/teams-utils";
import { useDrag, useDrop } from "react-dnd";
import { useRecoilCallback } from "recoil";

export type TeamMemberDndItem = {
  id: TeamMember["id"];
};

type TeamMemberDragCollectedProps = {
  isDragging: boolean;
};

type TeamMemberDropCollectedProps = {
  isOverCurrent: boolean;
};

export const useTeamMemberDrag = (id: TeamMember["id"]) => {
  return useDrag<TeamMemberDndItem, unknown, TeamMemberDragCollectedProps>(
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

export const useTeamMemberDrop = (teamId: Team["id"] | null | "NEW_TEAM") => {
  const updateTeamMember = useRecoilCallback(
    ({ set, snapshot }) =>
      async (teamMemberId: TeamMember["id"]) => {
        let actualTeamId = teamId === "NEW_TEAM" ? randomTeamId() : teamId;

        const memberPicked = await snapshot.getPromise(
          teamMemberAtomFamily(teamMemberId)
        );

        if (memberPicked.teamId !== actualTeamId) {
          // Update the box height of the selected member's new team.
          if (actualTeamId !== null) {
            const dropTeamMembersSnapshot = await snapshot.getPromise(
              teamMembersSelectorFamily(actualTeamId)
            );

            const dropTeamMembers = [...dropTeamMembersSnapshot];
            dropTeamMembers.push(memberPicked);

            const dropTeamBoxtotalHeight =
              calculateTeamBoxHeight(dropTeamMembers);

            set(teamBoxAtomFamily(actualTeamId), (currentData) => ({
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
          teamId: actualTeamId,
        }));
      },
    [teamId]
  );

  return useDrop<TeamMemberDndItem, unknown, TeamMemberDropCollectedProps>(
    () => ({
      accept: DraggableItemType.TEAM_MEMBER_AVATAR,
      drop: (item, monitor) => {
        // The team member is ignored if it was already accepted by another drop target.
        // This is useful since we have multiple containers that accept team-members (a team, the canvas).
        // If a team accepts the team-member being dragged, we want the canvas to ignore it.
        if (monitor.didDrop()) {
          return;
        }

        updateTeamMember(item.id);
      },
      collect: (monitor) => ({
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [updateTeamMember]
  );
};
