import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { Team, TeamMember } from "@/types/Team";
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
    ({ set }) =>
      (teamMemberId: TeamMember["id"]) => {
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
