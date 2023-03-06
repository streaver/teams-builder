import { teamMemberAtomFamily } from "@/state/recoil/atoms/teamMemberAtomFamily";
import { teamBoxAtomFamily } from "@/state/recoil/atoms/teamBoxAtomFamily";
import { Team, TeamMember } from "@/types/Team";
import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import { useRecoilCallback, useRecoilState } from "recoil";
import { TEAM_MEMBER_AVATAR } from "./TeamMemberAvatar";

type Props = {
  id: Team["id"] | null;
};

export const TeamBoxWrapper = ({ id, children }: PropsWithChildren<Props>) => {
  const updateTeamMember = useRecoilCallback(
    ({ set }) =>
      (teamMemberId: TeamMember["id"]) => {
        set(teamMemberAtomFamily(teamMemberId), (member) => ({
          ...member,
          teamId: id,
        }));
      },
    []
  );

  const [_, dropRef] = useDrop(() => ({
    accept: TEAM_MEMBER_AVATAR,
    drop: (item: { id: TeamMember["id"] }) => {
      updateTeamMember(item.id);
    },
  }));

  return <div ref={dropRef}>{children}</div>;
};
