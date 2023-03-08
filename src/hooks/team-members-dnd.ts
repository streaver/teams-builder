import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamMembersSelectorFamily } from "@/state/recoil/selectors/teamMembersSelectorFamily";
import { Team, TeamMember } from "@/types/Team";
import { calculateTeamBoxHeight } from "@/utils/teams-utils";
import { useDrag, useDrop } from "react-dnd";
import { useRecoilCallback } from "recoil";

export const TEAM_MEMBER_AVATAR = "team_member_avatar";

export type TeamMemberDndItem = {
  id: TeamMember["id"];
};

export const useTeamMemberDrag = (id: TeamMember["id"]) => {
  return useDrag<TeamMemberDndItem>(() => ({
    type: TEAM_MEMBER_AVATAR,
    item: {
      id,
    },
  }));
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
          const dropTeamMembersSnapshot = await snapshot.getPromise(
            teamMembersSelectorFamily(teamId)
          );

          const dropTeamMembers = [...dropTeamMembersSnapshot];
          dropTeamMembers.push(memberPicked);

          const dropTeamBoxtotalHeight =
            calculateTeamBoxHeight(dropTeamMembers);

          set(teamBoxAtomFamily(teamId!), (currentData) => ({
            ...currentData,
            height: dropTeamBoxtotalHeight,
          }));

          // Update the box height of the selected member's old team.
          const dragTeamMembersSnapshot = snapshot.getLoadable(
            teamMembersSelectorFamily(memberPicked.teamId)
          ).contents;

          const dragTeamMembers = dragTeamMembersSnapshot.filter(
            (member: TeamMember) => member.id !== teamMemberId
          );

          const dragTeamBoxtotalHeight =
            calculateTeamBoxHeight(dragTeamMembers);

          set(teamBoxAtomFamily(memberPicked.teamId!), (currentData) => ({
            ...currentData,
            height: dragTeamBoxtotalHeight,
          }));
        }

        set(teamMemberAtomFamily(teamMemberId), (member) => ({
          ...member,
          teamId,
        }));
      },
    [teamId]
  );

  return useDrop<TeamMemberDndItem>(() => ({
    accept: TEAM_MEMBER_AVATAR,
    drop: (item) => {
      updateTeamMember(item.id);
    },
  }));
};
